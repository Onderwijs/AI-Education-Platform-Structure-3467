import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import * as XLSX from 'xlsx';
import ForceGraph2D from 'react-force-graph-2d';

const { 
  FiUpload, FiClipboard, FiSettings, FiActivity, 
  FiDownload, FiSearch, FiEye, FiAlertTriangle, 
  FiCheck, FiUsers, FiGrid, FiXCircle, FiInfo,
  FiFileText, FiHelpCircle, FiDatabase, FiExternalLink,
  FiChevronDown, FiChevronUp
} = FiIcons;

const Sociogram = () => {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState('paste');
  const [inputText, setInputText] = useState('');
  const [parsedData, setParsedData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [parseMessage, setParseMessage] = useState(null);

  const [mapping, setMapping] = useState({
    name: '',
    socialPos: '',
    socialNeg: '',
    workPos: '',
    workNeg: ''
  });
  
  // UX State
  const [isExampleData, setIsExampleData] = useState(false);
  const [isStep2Expanded, setIsStep2Expanded] = useState(true);
  const [showExamples, setShowExamples] = useState(false);

  // Graph Data & View
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [viewMode, setViewMode] = useState('all');
  const [isGenerated, setIsGenerated] = useState(false);
  const [warnings, setWarnings] = useState([]);

  // Interaction & Graph
  const [hoverNode, setHoverNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const graphRef = useRef();

  const [showLabels, setShowLabels] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // --- LOGIC: TEMPLATE & EXAMPLE ---
  const handleDownloadTemplate = () => {
    const wb = XLSX.utils.book_new();
    const headers = ["Hoe heet je?", "Met wie vind je het gezellig?", "Met wie vind je het niet zo gezellig?", "Met wie kan je goed samenwerken?", "Met wie kan je niet zo goed samenwerken?"];
    const data = [headers, ["Vul hier een naam in", "Naam 1, Naam 2", "", "Naam 3", ""]];
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Sociogram Template");
    XLSX.writeFile(wb, "sociogram-template.xlsx");
  };

  const handleGoogleSheetOpen = () => {
    alert("⚠️ De Google Sheets-template is tijdelijk niet beschikbaar.");
  };

  const handleLoadExample = () => {
    const exampleCSV = `Hoe heet je?,Met wie vind je het gezellig?,Met wie vind je het niet zo gezellig?,Met wie kan je goed samenwerken?,Met wie kan je niet zo goed samenwerken?
Anna,Pietje,Klaasje,Pietje,
Pietje,Anna,Jantje,Anna,
Klaasje,Pietje,,,
Jantje,Anna,Klaasje,,
Lisa,Anna,Pietje,Lisa,
Tom,Jantje,,Tom,`;
    
    setInputText(exampleCSV);
    setActiveTab('paste');
    setIsExampleData(true);
    setIsStep2Expanded(false); // Visueel rustiger maken
    
    setTimeout(() => {
      processText(exampleCSV, true); // Direct koppelen voor voorbeeld
    }, 100);
  };

  // --- LOGIC: PARSING ---
  const handleFileUpload = (e) => {
    setIsExampleData(false);
    setIsStep2Expanded(true);
    setParseMessage(null);
    
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });

        if (data && data.length > 0) {
          const validHeaders = data[0].map((h, i) => (h && String(h).trim()) ? String(h).trim() : `Kolom ${i + 1}`);
          setHeaders(validHeaders);
          const rows = data.slice(1).map(row => {
            let obj = {};
            validHeaders.forEach((key, i) => obj[key] = (row[i] !== undefined) ? String(row[i]).trim() : '');
            return obj;
          });
          setParsedData(rows);
          autoMapHeaders(validHeaders);
        }
      } catch (err) {
        setParseMessage({ type: 'error', text: "Kon het bestand niet lezen." });
      }
    };
    reader.readAsBinaryString(file);
  };

  const handlePasteProcess = () => {
    // Als de tekst handmatig wordt gewijzigd, is het geen "voorbeelddata" meer
    if (inputText.length > 0 && !inputText.includes("Anna,Pietje,Klaasje")) {
      setIsExampleData(false);
      setIsStep2Expanded(true);
    }
    processText(inputText, true);
  };

  const processText = (textToProcess, allowAutoMap = true) => {
    setHeaders([]);
    setParsedData([]);

    if (!textToProcess.trim()) return;

    try {
      const lines = textToProcess.trim().split('\n').filter(l => l.trim().length > 0);
      if (lines.length === 0) return;

      const candidates = [',', '\t', ';', '|'];
      let bestSep = ',';
      let maxCount = -1;
      candidates.forEach(sep => {
        const count = lines[0].split(sep).length - 1;
        if (count > maxCount) { maxCount = count; bestSep = sep; }
      });

      const validHeaders = lines[0].split(bestSep).map((h, i) => h.trim() || `Kolom ${i + 1}`);
      setHeaders(validHeaders);

      const rows = lines.slice(1).map(line => {
        const values = line.split(bestSep).map(v => v.trim());
        let obj = {};
        validHeaders.forEach((key, i) => obj[key] = values[i] || '');
        return obj;
      });
      setParsedData(rows);
      
      if (allowAutoMap) autoMapHeaders(validHeaders);

    } catch (err) {
      setParseMessage({ type: 'error', text: "Kon de tekst niet verwerken." });
    }
  };

  const autoMapHeaders = (availableHeaders) => {
    const lowerHeaders = availableHeaders.map(h => h.toLowerCase());
    const findMatch = (keywords) => {
      const idx = lowerHeaders.findIndex(h => keywords.some(k => h.includes(k)));
      return idx !== -1 ? availableHeaders[idx] : '';
    };

    setMapping({
      name: findMatch(['hoe heet je', 'naam', 'leerling']),
      socialPos: findMatch(['met wie vind je het gezellig', 'social+']),
      socialNeg: findMatch(['met wie vind je het niet zo gezellig', 'social-']),
      workPos: findMatch(['met wie kan je goed samenwerken', 'work+']),
      workNeg: findMatch(['met wie kan je niet zo goed samenwerken', 'work-'])
    });
  };

  const handleMapChange = (field, value) => {
    setMapping(prev => ({ ...prev, [field]: value }));
  };

  // --- LOGIC: GENERATION ---
  const generateGraph = () => {
    if (!mapping.name) return;
    const nodes = [];
    const links = [];
    const studentNamesSet = new Set();

    parsedData.forEach(row => {
      const name = row[mapping.name]?.trim();
      if (name && !studentNamesSet.has(name)) {
        studentNamesSet.add(name);
        nodes.push({ id: name, val: 1 });
      }
    });

    parsedData.forEach(row => {
      const source = row[mapping.name]?.trim();
      if (!source || !studentNamesSet.has(source)) return;

      const processLink = (col, type) => {
        if (!col) return;
        const targets = String(row[col] || '').replace(/[;|]/g, ',').split(',').map(s => s.trim()).filter(s => s.length > 0);
        targets.forEach(target => {
          if (studentNamesSet.has(target)) links.push({ source, target, type });
        });
      };

      processLink(mapping.socialPos, 'socialPos');
      processLink(mapping.socialNeg, 'socialNeg');
      processLink(mapping.workPos, 'workPos');
      processLink(mapping.workNeg, 'workNeg');
    });

    setGraphData({ nodes, links });
    setIsGenerated(true);
  };

  // --- LOGIC: VISUALIZATION ---
  const getLinkColor = (link) => {
    if (viewMode !== 'all' && link.type !== viewMode) return 'rgba(0,0,0,0)';
    if (highlightLinks.size > 0 && !highlightLinks.has(link)) return 'rgba(200,200,200,0.1)';
    switch(link.type) {
      case 'socialPos': return '#22c55e';
      case 'socialNeg': return '#ef4444';
      case 'workPos': return '#3b82f6';
      case 'workNeg': return '#f97316';
      default: return '#9ca3af';
    }
  };

  const updateHighlight = useCallback(() => {
    const hNodes = new Set();
    const hLinks = new Set();
    const activeId = hoverNode || selectedNode;

    if (activeId) {
      hNodes.add(activeId);
      graphData.links.forEach(link => {
        if (viewMode !== 'all' && link.type !== viewMode) return;
        const sId = typeof link.source === 'object' ? link.source.id : link.source;
        const tId = typeof link.target === 'object' ? link.target.id : link.target;
        if (sId === activeId || tId === activeId) {
          hLinks.add(link); hNodes.add(sId); hNodes.add(tId);
        }
      });
    }
    setHighlightNodes(hNodes);
    setHighlightLinks(hLinks);
  }, [hoverNode, selectedNode, graphData, viewMode]);

  useEffect(() => { updateHighlight(); }, [updateHighlight]);

  const hasName = !!mapping.name;
  const hasRelation = !!(mapping.socialPos || mapping.socialNeg || mapping.workPos || mapping.workNeg);
  const isFormValid = hasName && hasRelation;

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHero 
        title="Interactief Sociogram" 
        subtitle="Visualiseer sociale relaties en samenwerkingsvoorkeuren in de klas." 
        color="from-blue-600 to-indigo-600" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isGenerated && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             {/* Uitlegblok */}
             <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 mb-8">
               <div className="flex items-start gap-4">
                 <div className="bg-blue-100 p-3 rounded-full hidden sm:block">
                   <SafeIcon icon={FiHelpCircle} className="text-2xl text-blue-600" />
                 </div>
                 <div>
                   <h2 className="text-xl font-bold text-gray-900 mb-3">Hoe gebruik je dit sociogram?</h2>
                   <div className="prose prose-sm text-gray-600">
                     <p className="mb-2">Deze tool werkt met antwoorden van leerlingen op een korte vragenlijst.</p>
                     <ul className="list-none space-y-2 pl-0">
                       <li className="flex items-start gap-2">
                         <span className="font-bold text-blue-600">Stap 1 –</span>
                         <span>Plak of upload de antwoorden uit je vragenlijst (Excel/CSV).</span>
                       </li>
                       <li className="flex items-start gap-2">
                         <span className="font-bold text-blue-600">Stap 2 –</span>
                         <span>Controleer of de kolommen correct zijn gekoppeld.</span>
                       </li>
                       <li className="flex items-start gap-2">
                         <span className="font-bold text-blue-600">Stap 3 –</span>
                         <span>Bekijk het interactieve netwerk van je klas.</span>
                       </li>
                     </ul>
                   </div>
                 </div>
               </div>
             </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
              <div className="flex items-center space-x-2 mb-6 pb-4 border-b">
                <SafeIcon icon={FiGrid} className="text-2xl text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Stap 1: Data Invoeren</h2>
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex space-x-2 p-1 bg-gray-100 rounded-lg">
                  <button onClick={() => setActiveTab('paste')} className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors text-sm ${activeTab === 'paste' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                    <SafeIcon icon={FiClipboard} /> <span>Plakken</span>
                  </button>
                  <button onClick={() => setActiveTab('upload')} className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors text-sm ${activeTab === 'upload' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                    <SafeIcon icon={FiUpload} /> <span>Uploaden</span>
                  </button>
                </div>
                
                <button onClick={handleLoadExample} className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors text-sm bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 ml-auto">
                  <SafeIcon icon={FiDatabase} /> <span>Gebruik voorbeelddata</span>
                </button>
              </div>

              {activeTab === 'paste' ? (
                <div className="mb-6">
                  <textarea 
                    className="w-full h-48 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    placeholder="Plak hier je tabel met antwoorden..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onBlur={handlePasteProcess}
                  ></textarea>
                </div>
              ) : (
                <div className="mb-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                  <SafeIcon icon={FiUpload} className="text-4xl text-gray-400 mx-auto mb-4" />
                  <input type="file" accept=".csv, .xlsx" onChange={handleFileUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                </div>
              )}

              {headers.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <div>
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <SafeIcon icon={FiSettings} /> Stap 2: Kolommen Koppelen
                      </h3>
                      {isExampleData ? (
                        <div className="flex items-center gap-2 mt-1 text-green-600 font-medium text-sm">
                          <SafeIcon icon={FiCheck} />
                          <span>Kolommen zijn automatisch gekoppeld (voorbeelddata).</span>
                          <button 
                            onClick={() => setIsStep2Expanded(!isStep2Expanded)}
                            className="ml-2 text-blue-600 hover:underline flex items-center gap-1"
                          >
                            {isStep2Expanded ? 'Verberg details' : 'Toon kolomkoppeling'}
                            <SafeIcon icon={isStep2Expanded ? FiChevronUp : FiChevronDown} />
                          </button>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 mt-1">Controleer hieronder of de kolommen correct zijn gekoppeld.</p>
                      )}
                    </div>
                    
                    {!isStep2Expanded && isFormValid && (
                       <button onClick={generateGraph} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200">
                         <SafeIcon icon={FiActivity} />
                         <span>Genereer Sociogram</span>
                       </button>
                    )}
                  </div>

                  <AnimatePresence>
                    {isStep2Expanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
                          {[
                            { id: 'name', label: 'Naam Leerling', req: true },
                            { id: 'socialPos', label: 'Gezellig (Social +)' },
                            { id: 'socialNeg', label: 'Niet Gezellig (Social -)' },
                            { id: 'workPos', label: 'Samenwerken (Work +)' },
                            { id: 'workNeg', label: 'Niet Samenwerken (Work -)' }
                          ].map(field => (
                            <div key={field.id}>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {field.label} {field.req && <span className="text-red-500">*</span>}
                              </label>
                              <select 
                                className={`w-full p-2 border rounded-lg bg-white ${mapping[field.id] ? 'border-blue-300 ring-1 ring-blue-100' : 'border-gray-300'}`}
                                value={mapping[field.id]}
                                onChange={(e) => handleMapChange(field.id, e.target.value)}
                              >
                                <option value="">-- Selecteer kolom --</option>
                                {headers.map(h => <option key={h} value={h}>{h}</option>)}
                              </select>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex justify-end items-center gap-4 pt-4 border-t border-gray-50">
                          <button onClick={generateGraph} disabled={!isFormValid} className={`px-8 py-3 rounded-xl font-bold flex items-center space-x-2 transition-all ${isFormValid ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                            <SafeIcon icon={FiActivity} />
                            <span>Genereer Sociogram</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {isGenerated && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-8 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col h-[700px]">
              <div className="p-4 border-b border-gray-100 flex flex-wrap gap-4 justify-between items-center bg-gray-50">
                <div className="flex space-x-2">
                  {['all', 'socialPos', 'socialNeg', 'workPos', 'workNeg'].map(mode => (
                    <button key={mode} onClick={() => setViewMode(mode)} className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${viewMode === mode ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:bg-gray-200'}`}>
                      {mode === 'all' ? 'Alles' : mode}
                    </button>
                  ))}
                </div>
                <button onClick={() => setIsGenerated(false)} className="px-3 py-1.5 text-xs bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Nieuwe Data</button>
              </div>
              <div className="flex-grow relative bg-slate-50">
                <ForceGraph2D
                  ref={graphRef}
                  width={800} height={600}
                  graphData={graphData}
                  nodeColor={node => (highlightNodes.has(node.id) ? '#2563eb' : '#64748b')}
                  nodeRelSize={6}
                  linkColor={getLinkColor}
                  linkWidth={link => highlightLinks.has(link) ? 2 : 1}
                  onNodeHover={node => setHoverNode(node ? node.id : null)}
                  d3VelocityDecay={0.3}
                />
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-4 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
               <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                 <SafeIcon icon={FiUsers} className="text-blue-500" /> Details
               </h3>
               <p className="text-sm text-gray-500 italic">Selecteer een leerling in het netwerk links om keuzes en relaties te bekijken.</p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sociogram;