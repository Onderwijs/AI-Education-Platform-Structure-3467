import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
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
  FiFilter
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
  
  const [showExamples, setShowExamples] = useState(false);
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [viewMode, setViewMode] = useState('all');
  const [isGenerated, setIsGenerated] = useState(false);
  const [warnings, setWarnings] = useState([]);

  const [hoverNode, setHoverNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const graphRef = useRef();

  const [showLabels, setShowLabels] = useState(true);
  const [linkDistance, setLinkDistance] = useState(50);
  const [searchTerm, setSearchTerm] = useState('');

  // --- LOGIC: TEMPLATE & EXAMPLE ---
  const handleDownloadTemplate = () => {
    const wb = XLSX.utils.book_new();
    const headers = [
      "Hoe heet je?", 
      "Met wie vind je het gezellig?", 
      "Met wie vind je het niet zo gezellig?", 
      "Met wie kan je goed samenwerken?", 
      "Met wie kan je niet zo goed samenwerken?"
    ];
    const data = [
      headers,
      ["Vul hier een naam in", "Naam 1, Naam 2", "", "Naam 3", ""], 
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [{wch: 20}, {wch: 30}, {wch: 30}, {wch: 30}, {wch: 30}];
    XLSX.utils.book_append_sheet(wb, ws, "Sociogram Template");
    XLSX.writeFile(wb, "sociogram-template.xlsx");
  };

  const handleGoogleSheetOpen = () => {
    const SHEET_ID = "PLAATS_HIER_JOUW_SHEET_ID"; 
    if (!SHEET_ID || SHEET_ID === "PLAATS_HIER_JOUW_SHEET_ID") {
      alert("⚠️ De Google Sheets-template is tijdelijk niet beschikbaar.");
      return;
    }
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/copy`;
    window.open(url, '_blank', 'noopener,noreferrer');
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
    setShowExamples(false);
    
    // Reset mapping om verwarring te voorkomen (Geen automatische activatie in Stap 2)
    setMapping({ name: '', socialPos: '', socialNeg: '', workPos: '', workNeg: '' });
    
    // We verwerken alleen de headers zodat de dropdowns verschijnen, 
    // maar we laten de keuzes leeg voor de gebruiker.
    setTimeout(() => {
      processText(exampleCSV, false); // false = skip auto-mapping
    }, 100);
  };

  // --- LOGIC: PARSING ---
  const handleFileUpload = (e) => {
    setParseMessage(null);
    setHeaders([]);
    setParsedData([]);
    setShowExamples(false);
    
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });

        if (data && data.length > 0) {
          const headersRaw = data[0];
          const validHeaders = headersRaw.map((h, i) => (h && String(h).trim()) ? String(h).trim() : `Kolom ${i + 1}`);
          setHeaders(validHeaders);

          const rows = data.slice(1).map(row => {
            let obj = {};
            validHeaders.forEach((key, i) => {
              const val = row[i];
              obj[key] = (val !== undefined && val !== null) ? String(val).trim() : '';
            });
            return obj;
          });
          setParsedData(rows);
          // Bij upload doen we wel auto-mapping als service
          autoMapHeaders(validHeaders);

          if (rows.length === 0) {
            setParseMessage({ type: 'warning', text: "Het bestand bevat headers, maar geen datarijen." });
          }
        }
      } catch (err) {
        setParseMessage({ type: 'error', text: "Kon het bestand niet lezen." });
      }
    };
    reader.readAsBinaryString(file);
  };

  const handlePasteProcess = () => {
    setShowExamples(false);
    processText(inputText, true); // true = allow auto-mapping voor eigen data
  };

  const processText = (textToProcess, allowAutoMap = true) => {
    setParseMessage(null);
    setHeaders([]);
    setParsedData([]);

    if (!textToProcess.trim()) return;

    try {
      const rawLines = textToProcess.trim().split('\n');
      const lines = rawLines.filter(line => line.trim().length > 0);
      if (lines.length === 0) return;

      const firstLine = lines[0];
      const candidates = [',', '\t', ';', '|'];
      let bestSeparator = ',';
      let maxCount = -1;

      candidates.forEach(sep => {
        const count = firstLine.split(sep).length - 1;
        if (count > maxCount) {
          maxCount = count;
          bestSeparator = sep;
        }
      });

      let headersRaw = firstLine.split(bestSeparator).map(h => h.trim());
      const validHeaders = headersRaw.map((h, i) => h ? h : `Kolom ${i + 1}`);
      setHeaders(validHeaders);

      const rows = lines.slice(1).map(line => {
        const values = line.split(bestSeparator).map(v => v.trim());
        let obj = {};
        validHeaders.forEach((key, i) => {
          obj[key] = values[i] || '';
        });
        return obj;
      });
      setParsedData(rows);
      
      if (allowAutoMap) {
        autoMapHeaders(validHeaders);
      }

    } catch (err) {
      setParseMessage({ type: 'error', text: "Kon de tekst niet verwerken." });
    }
  };

  const autoMapHeaders = (availableHeaders) => {
    const newMapping = { ...mapping };
    const lowerHeaders = availableHeaders.map(h => h.toLowerCase());

    const findMatch = (keywords) => {
      const idx = lowerHeaders.findIndex(h => keywords.some(k => h.includes(k)));
      return idx !== -1 ? availableHeaders[idx] : '';
    };

    if (!newMapping.name) newMapping.name = findMatch(['hoe heet je', 'naam', 'leerling', 'student']);
    if (!newMapping.socialPos) newMapping.socialPos = findMatch(['met wie vind je het gezellig', 'gezellig met', 'social+']);
    if (!newMapping.socialNeg) newMapping.socialNeg = findMatch(['met wie vind je het niet zo gezellig', 'niet gezellig', 'social-']);
    if (!newMapping.workPos) newMapping.workPos = findMatch(['met wie kan je goed samenwerken', 'samenwerken', 'work+']);
    if (!newMapping.workNeg) newMapping.workNeg = findMatch(['met wie kan je niet zo goed samenwerken', 'niet samenwerken', 'work-']);

    setMapping(newMapping);
  };

  const handleMapChange = (field, value) => {
    setMapping(prev => ({ ...prev, [field]: value }));
  };

  // --- LOGIC: GENERATION ---
  const generateGraph = () => {
    if (!mapping.name) return;

    const nodes = [];
    const links = [];
    const newWarnings = [];
    const studentNamesSet = new Set();

    parsedData.forEach(row => {
      const name = row[mapping.name]?.trim();
      if (name) {
        if (!studentNamesSet.has(name)) {
          studentNamesSet.add(name);
          nodes.push({ id: name, val: 1 });
        }
      }
    });

    parsedData.forEach(row => {
      const source = row[mapping.name]?.trim();
      if (!source || !studentNamesSet.has(source)) return;

      const processLinkType = (colName, type) => {
        if (!colName) return;
        const targets = String(row[colName] || '').replace(/[;|]/g, ',').split(',').map(s => s.trim()).filter(s => s.length > 0);
        
        targets.forEach(target => {
          if (studentNamesSet.has(target)) {
            links.push({ source, target, type });
          }
        });
      };

      if (mapping.socialPos) processLinkType(mapping.socialPos, 'socialPos');
      if (mapping.socialNeg) processLinkType(mapping.socialNeg, 'socialNeg');
      if (mapping.workPos) processLinkType(mapping.workPos, 'workPos');
      if (mapping.workNeg) processLinkType(mapping.workNeg, 'workNeg');
    });

    setGraphData({ nodes, links });
    setWarnings(newWarnings);
    setIsGenerated(true);
  };

  // --- LOGIC: VISUALIZATION HELPERS ---
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

  const handleNodeClick = (node) => {
    setSelectedNode(selectedNode === node.id ? null : node.id);
  };

  const getStats = () => {
    const stats = {};
    graphData.nodes.forEach(n => { stats[n.id] = { incoming: 0, outgoing: 0, incomingNames: [], outgoingNames: [] }; });
    graphData.links.forEach(link => {
      if (viewMode !== 'all' && link.type !== viewMode) return;
      const sId = typeof link.source === 'object' ? link.source.id : link.source;
      const tId = typeof link.target === 'object' ? link.target.id : link.target;
      if (stats[sId]) { stats[sId].outgoing++; stats[sId].outgoingNames.push(tId); }
      if (stats[tId]) { stats[tId].incoming++; stats[tId].incomingNames.push(sId); }
    });
    return stats;
  };

  const getLegendColor = (mode) => {
    switch(mode) {
      case 'socialPos': return 'bg-green-500';
      case 'socialNeg': return 'bg-red-500';
      case 'workPos': return 'bg-blue-500';
      case 'workNeg': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getLegendLabel = (mode) => {
    switch(mode) {
      case 'socialPos': return 'Gezellig';
      case 'socialNeg': return 'Niet gezellig';
      case 'workPos': return 'Samenwerken';
      case 'workNeg': return 'Niet samenwerken';
      default: return '';
    }
  };

  const hasName = !!mapping.name;
  const hasRelation = !!(mapping.socialPos || mapping.socialNeg || mapping.workPos || mapping.workNeg);
  const isFormValid = hasName && hasRelation;

  const stats = getStats();
  const sortedList = Object.entries(stats).map(([name, data]) => ({ name, ...data })).sort((a, b) => b.incoming - a.incoming);
  const activeStats = (selectedNode || hoverNode) ? stats[selectedNode || hoverNode] : null;

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
             <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 mb-8">
               <div className="flex items-start gap-4">
                 <div className="bg-blue-100 p-3 rounded-full hidden sm:block">
                   <SafeIcon icon={FiHelpCircle} className="text-2xl text-blue-600" />
                 </div>
                 <div>
                   <h2 className="text-xl font-bold text-gray-900 mb-3">Hoe gebruik je dit sociogram?</h2>
                   <div className="prose prose-sm text-gray-600">
                     <p className="mb-2"><strong>Je vult hier geen eigen inschattingen in.</strong> Deze tool werkt met antwoorden van leerlingen op een vragenlijst.</p>
                     <ul className="list-none space-y-2 pl-0">
                       <li className="flex items-start gap-2">
                         <span className="font-bold text-blue-600">Stap 1 –</span>
                         <span>Plak of upload de antwoorden uit je vragenlijst (Excel/CSV).</span>
                       </li>
                       <li className="flex items-start gap-2">
                         <span className="font-bold text-blue-600">Stap 2 –</span>
                         <span>Koppel de juiste kolommen aan de categorieën (bijv. "Naam" aan "Naam Leerling").</span>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plak hier CSV of tab-gescheiden data</label>
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
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <SafeIcon icon={FiSettings} /> Stap 2: Kolommen Koppelen
                      </h3>
                      <p className="text-sm text-blue-600 font-medium mt-1">
                        Controleer hieronder of de kolommen correct zijn gekoppeld.
                      </p>
                    </div>
                    <button onClick={() => setShowExamples(!showExamples)} className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors">
                      {showExamples ? 'Verberg voorbeelden' : 'Bekijk voorbeeldwaarden (optioneel)'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        {showExamples && mapping[field.id] && parsedData.length > 0 && (
                          <p className="mt-1 text-xs text-gray-500 truncate italic">
                            Waarde: {parsedData[0][mapping[field.id]]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-end items-center gap-4">
                    {!isFormValid && (
                      <span className="text-sm text-gray-500 italic">Selecteer minimaal een naam en één relatie.</span>
                    )}
                    <button onClick={generateGraph} disabled={!isFormValid} className={`px-6 py-3 rounded-lg font-bold flex items-center space-x-2 transition-colors ${isFormValid ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                      <SafeIcon icon={FiActivity} /> <span>Genereer Sociogram</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {isGenerated && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-8 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col h-[800px]">
              <div className="p-4 border-b border-gray-100 flex flex-wrap gap-4 justify-between items-center bg-gray-50">
                <div className="flex space-x-2 overflow-x-auto pb-1">
                  {['all', 'socialPos', 'socialNeg', 'workPos', 'workNeg'].map(mode => (
                    <button key={mode} onClick={() => setViewMode(mode)} className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors whitespace-nowrap ${viewMode === mode ? 'bg-white shadow text-gray-900 ring-1 ring-gray-200' : 'text-gray-600 hover:bg-gray-200'}`}>
                      {mode === 'all' ? 'Alles' : getLegendLabel(mode)}
                    </button>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => setIsGenerated(false)} className="px-3 py-1.5 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Nieuwe Data</button>
                </div>
              </div>

              <div className="flex-grow relative bg-slate-50 cursor-move">
                <ForceGraph2D
                  ref={graphRef}
                  width={800} height={700}
                  graphData={graphData}
                  nodeLabel="id"
                  nodeColor={node => (highlightNodes.has(node.id) ? '#2563eb' : '#64748b')}
                  nodeRelSize={6}
                  linkColor={getLinkColor}
                  linkWidth={link => highlightLinks.has(link) ? 2 : 1}
                  linkDirectionalArrowLength={3.5}
                  linkDirectionalArrowRelPos={1}
                  onNodeHover={node => { setHoverNode(node ? node.id : null); document.body.style.cursor = node ? 'pointer' : null; }}
                  onNodeClick={handleNodeClick}
                  d3VelocityDecay={0.3}
                />
                
                <div className="absolute top-4 left-4 w-64">
                  <div className="relative">
                    <SafeIcon icon={FiSearch} className="absolute left-3 top-2.5 text-gray-400" />
                    <input type="text" placeholder="Zoek leerling..." className="w-full pl-10 pr-4 py-2 bg-white/90 backdrop-blur border border-gray-200 rounded-lg shadow-sm text-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur p-3 rounded-lg shadow-sm border border-gray-200 text-xs">
                  <div className="font-bold mb-2 text-gray-700">Legenda</div>
                  {['socialPos', 'socialNeg', 'workPos', 'workNeg'].map(mode => (
                    <div key={mode} className={`flex items-center gap-2 mb-1 ${viewMode !== 'all' && viewMode !== mode ? 'opacity-30' : ''}`}>
                      <div className={`w-3 h-3 rounded-full ${getLegendColor(mode)}`}></div>
                      <span>{getLegendLabel(mode)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <SafeIcon icon={FiUsers} className="text-blue-500" /> Details
                </h3>
                {activeStats ? (
                  <div>
                    <div className="text-2xl font-bold text-gray-800 mb-4">{selectedNode || hoverNode}</div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-blue-50 p-3 rounded-lg text-center">
                        <span className="block text-xs text-blue-600 font-bold uppercase">Gekozen door</span>
                        <span className="text-xl font-bold text-blue-900">{activeStats.incoming}</span>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg text-center">
                        <span className="block text-xs text-green-600 font-bold uppercase">Keuzes gemaakt</span>
                        <span className="text-xl font-bold text-green-900">{activeStats.outgoing}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-400 text-sm text-center py-8">Klik op een leerling voor details.</div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sociogram;