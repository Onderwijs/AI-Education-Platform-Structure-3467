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
  FiChevronDown, FiChevronUp, FiFilter, FiMaximize2
} = FiIcons;

const Sociogram = () => {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState('paste');
  const [inputText, setInputText] = useState('');
  const [parsedData, setParsedData] = useState([]);
  const [headers, setHeaders] = useState([]);
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
  const [isGenerated, setIsGenerated] = useState(false);
  const [viewMode, setViewMode] = useState('all'); // all, socialPos, socialNeg, workPos, workNeg

  // Graph Data & Interaction
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [hoverNode, setHoverNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const graphRef = useRef();

  // --- LOGIC: TEMPLATE & EXAMPLE ---
  const handleDownloadTemplate = () => {
    const wb = XLSX.utils.book_new();
    const headers = ["Hoe heet je?", "Met wie vind je het gezellig?", "Met wie vind je het niet zo gezellig?", "Met wie kan je goed samenwerken?", "Met wie kan je niet zo goed samenwerken?"];
    const data = [headers, ["Anna", "Pietje, Lisa", "Klaasje", "Pietje", ""]];
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Sociogram Template");
    XLSX.writeFile(wb, "sociogram-template.xlsx");
  };

  const handleLoadExample = () => {
    const exampleCSV = `Hoe heet je?,Met wie vind je het gezellig?,Met wie vind je het niet zo gezellig?,Met wie kan je goed samenwerken?,Met wie kan je niet zo goed samenwerken?
Anna,"Pietje, Jantje",Klaasje,Pietje,
Pietje,Anna,Jantje,Anna,
Klaasje,Pietje,,,
Jantje,Anna,Klaasje,,
Lisa,Anna,Pietje,Lisa,
Tom,Jantje,,Tom,`;
    
    setInputText(exampleCSV);
    setActiveTab('paste');
    setIsExampleData(true);
    setIsStep2Expanded(false);
    
    setTimeout(() => {
      processText(exampleCSV, true);
    }, 100);
  };

  // --- LOGIC: DATA PROCESSING ---
  const processText = (textToProcess, allowAutoMap = true) => {
    if (!textToProcess.trim()) return;
    try {
      const lines = textToProcess.trim().split('\n').filter(l => l.trim().length > 0);
      if (lines.length === 0) return;

      // Detect separator
      const candidates = [',', '\t', ';', '|'];
      let bestSep = ',';
      let maxCount = -1;
      candidates.forEach(sep => {
        const count = lines[0].split(sep).length - 1;
        if (count > maxCount) { maxCount = count; bestSep = sep; }
      });

      const validHeaders = lines[0].split(bestSep).map((h, i) => h.trim().replace(/^"|"$/g, '') || `Kolom ${i + 1}`);
      setHeaders(validHeaders);

      const rows = lines.slice(1).map(line => {
        // Simple CSV parser for quoted strings
        const values = line.match(/(".*?"|[^",\t;|]+)(?=\s*[, \t;|]|\s*$)/g) || [];
        let obj = {};
        validHeaders.forEach((key, i) => {
          obj[key] = values[i] ? values[i].trim().replace(/^"|"$/g, '') : '';
        });
        return obj;
      });
      setParsedData(rows);
      if (allowAutoMap) autoMapHeaders(validHeaders);
    } catch (err) {
      console.error("Parse error:", err);
    }
  };

  const autoMapHeaders = (availableHeaders) => {
    const lowerHeaders = availableHeaders.map(h => h.toLowerCase());
    const findMatch = (keywords) => {
      const idx = lowerHeaders.findIndex(h => keywords.some(k => h.includes(k)));
      return idx !== -1 ? availableHeaders[idx] : '';
    };

    setMapping({
      name: findMatch(['hoe heet je', 'naam', 'leerling', 'student']),
      socialPos: findMatch(['gezellig', 'social+', 'vrienden']),
      socialNeg: findMatch(['niet gezellig', 'social-', 'liever niet']),
      workPos: findMatch(['samenwerken', 'work+', 'groepje']),
      workNeg: findMatch(['niet samenwerken', 'work-', 'lastig'])
    });
  };

  const handleFileUpload = (e) => {
    setIsExampleData(false);
    setIsStep2Expanded(true);
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
        alert("Fout bij het lezen van bestand.");
      }
    };
    reader.readAsBinaryString(file);
  };

  // --- LOGIC: GRAPH GENERATION ---
  const generateGraph = () => {
    if (!mapping.name) return;
    const nodes = [];
    const links = [];
    const studentNamesSet = new Set();

    // 1. Collect all unique names
    parsedData.forEach(row => {
      const name = row[mapping.name]?.trim();
      if (name && !studentNamesSet.has(name)) {
        studentNamesSet.add(name);
        nodes.push({ id: name, name: name });
      }
    });

    // 2. Create links
    parsedData.forEach(row => {
      const source = row[mapping.name]?.trim();
      if (!source || !studentNamesSet.has(source)) return;

      const processLink = (col, type) => {
        if (!col) return;
        const val = String(row[col] || '');
        const targets = val.split(/[,\n;]/).map(s => s.trim()).filter(s => s.length > 0);
        
        targets.forEach(target => {
          if (studentNamesSet.has(target)) {
            links.push({ source, target, type });
          }
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

  // --- VISUALIZATION HELPERS ---
  const getLinkColor = (link) => {
    if (viewMode !== 'all' && link.type !== viewMode) return 'transparent';
    const isHighlighted = highlightLinks.size > 0 && highlightLinks.has(link);
    const opacity = highlightLinks.size > 0 && !isHighlighted ? '0.05' : '0.6';
    
    switch(link.type) {
      case 'socialPos': return `rgba(34, 197, 94, ${opacity})`; // Green
      case 'socialNeg': return `rgba(239, 68, 68, ${opacity})`; // Red
      case 'workPos': return `rgba(59, 130, 246, ${opacity})`; // Blue
      case 'workNeg': return `rgba(249, 115, 22, ${opacity})`; // Orange
      default: return `rgba(156, 163, 175, ${opacity})`;
    }
  };

  const updateHighlight = useCallback(() => {
    const hNodes = new Set();
    const hLinks = new Set();
    const activeId = hoverNode || (selectedNode ? selectedNode.id : null);

    if (activeId) {
      hNodes.add(activeId);
      graphData.links.forEach(link => {
        if (viewMode !== 'all' && link.type !== viewMode) return;
        const sId = typeof link.source === 'object' ? link.source.id : link.source;
        const tId = typeof link.target === 'object' ? link.target.id : link.target;
        if (sId === activeId || tId === activeId) {
          hLinks.add(link);
          hNodes.add(sId);
          hNodes.add(tId);
        }
      });
    }
    setHighlightNodes(hNodes);
    setHighlightLinks(hLinks);
  }, [hoverNode, selectedNode, graphData, viewMode]);

  useEffect(() => { updateHighlight(); }, [updateHighlight]);

  const isFormValid = !!mapping.name && (!!mapping.socialPos || !!mapping.socialNeg || !!mapping.workPos || !!mapping.workNeg);

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHero 
        title="Interactief Sociogram" 
        subtitle="Visualiseer de sociale dynamiek en samenwerkingsvoorkeuren in jouw klas." 
        color="from-blue-600 to-indigo-700" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!isGenerated ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            
            {/* 1. Template Sectie */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8 shadow-sm flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <SafeIcon icon={FiFileText} className="text-blue-600 text-xl" />
                  <h3 className="font-bold text-gray-900 leading-tight">Gebruik de standaard sociogram-template</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Download de Excel-template en vul per leerling de namen in. Meerdere namen in één cel scheid je met komma’s.
                </p>
              </div>
              <button 
                onClick={handleDownloadTemplate}
                className="bg-white text-blue-600 border border-blue-200 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors shadow-sm shrink-0"
              >
                <SafeIcon icon={FiDownload} />
                <span>Download Excel-template</span>
              </button>
            </div>

            {/* 2. Stap 1: Data Invoeren */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-8 font-sans">
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
                
                <div className="ml-auto text-right">
                  <button 
                    onClick={handleLoadExample} 
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors text-sm bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200"
                  >
                    <SafeIcon icon={FiDatabase} /> 
                    <span>Test met voorbeelddata</span>
                  </button>
                  <p className="text-[10px] text-gray-400 mt-1 max-w-[220px] leading-tight">
                    Dit vult tijdelijke voorbeelddata in om de tool te testen.
                  </p>
                </div>
              </div>

              {activeTab === 'paste' ? (
                <textarea 
                  className="w-full h-48 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-mono text-sm bg-gray-50"
                  placeholder="Plak hier je tabel met antwoorden uit Excel..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onBlur={() => processText(inputText, true)}
                ></textarea>
              ) : (
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-10 text-center">
                  <SafeIcon icon={FiUpload} className="text-4xl text-gray-400 mx-auto mb-4" />
                  <input type="file" accept=".csv, .xlsx" onChange={handleFileUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                </div>
              )}

              {/* 3. Stap 2: Kolommen Koppelen */}
              {headers.length > 0 && (
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                      <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
                        <SafeIcon icon={FiSettings} /> Stap 2: Kolommen Koppelen
                      </h3>
                      {isExampleData ? (
                        <div className="flex items-center gap-2 mt-1 text-green-600 font-medium text-sm">
                          <SafeIcon icon={FiCheck} />
                          <span>Kolommen zijn automatisch gekoppeld (voorbeelddata).</span>
                          <button 
                            onClick={() => setIsStep2Expanded(!isStep2Expanded)}
                            className="ml-2 text-blue-600 hover:underline flex items-center gap-1 text-xs"
                          >
                            {isStep2Expanded ? 'Verberg details' : 'Toon kolomkoppeling'}
                            <SafeIcon icon={isStep2Expanded ? FiChevronUp : FiChevronDown} />
                          </button>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 mt-1">Geef aan welke kolom welke informatie bevat.</p>
                      )}
                    </div>
                    
                    {!isStep2Expanded && isFormValid && (
                       <button onClick={generateGraph} className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-200 transform hover:-translate-y-0.5">
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                          {[
                            { id: 'name', label: 'Naam Leerling', req: true },
                            { id: 'socialPos', label: 'Gezellig (Social +)' },
                            { id: 'socialNeg', label: 'Niet Gezellig (Social -)' },
                            { id: 'workPos', label: 'Samenwerken (Work +)' },
                            { id: 'workNeg', label: 'Niet Samenwerken (Work -)' }
                          ].map(field => (
                            <div key={field.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                {field.label} {field.req && <span className="text-red-500">*</span>}
                              </label>
                              <select 
                                className={`w-full p-2.5 border rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 ${mapping[field.id] ? 'border-blue-300' : 'border-gray-300'}`}
                                value={mapping[field.id]}
                                onChange={(e) => setMapping(prev => ({ ...prev, [field.id]: e.target.value }))}
                              >
                                <option value="">-- Kies kolom --</option>
                                {headers.map(h => <option key={h} value={h}>{h}</option>)}
                              </select>
                              {mapping[field.id] && parsedData.length > 0 && (
                                <p className="mt-2 text-[10px] text-gray-400 italic truncate flex items-center gap-1">
                                  <SafeIcon icon={FiInfo} /> Voorbeeld: {parsedData[0][mapping[field.id]]}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex justify-end items-center gap-4 pt-6 border-t border-gray-100">
                          <button 
                            onClick={generateGraph} 
                            disabled={!isFormValid} 
                            className={`px-12 py-4 rounded-xl font-bold flex items-center space-x-2 transition-all shadow-lg ${isFormValid ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:-translate-y-0.5' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                          >
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
        ) : (
          /* RESULTATEN SECTIE */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Graph Container */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="lg:col-span-8 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[750px] relative">
              <div className="p-4 border-b border-gray-100 flex flex-wrap gap-4 justify-between items-center bg-gray-50/50 backdrop-blur-md z-10">
                <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200">
                  {[
                    { id: 'all', label: 'Alles', color: 'text-gray-600' },
                    { id: 'socialPos', label: 'Sociaal+', color: 'text-green-600' },
                    { id: 'socialNeg', label: 'Sociaal-', color: 'text-red-600' },
                    { id: 'workPos', label: 'Werk+', color: 'text-blue-600' },
                    { id: 'workNeg', label: 'Werk-', color: 'text-orange-600' }
                  ].map(mode => (
                    <button key={mode.id} onClick={() => setViewMode(mode.id)} className={`px-4 py-2 text-xs rounded-lg font-bold transition-all ${viewMode === mode.id ? 'bg-gray-900 text-white shadow-md' : `hover:bg-gray-100 ${mode.color}`}`}>
                      {mode.label}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setIsGenerated(false)} className="px-4 py-2 text-xs bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 font-bold flex items-center gap-2">
                    <SafeIcon icon={FiGrid} /> Nieuwe Data
                  </button>
                </div>
              </div>

              <div className="flex-grow bg-slate-50 relative cursor-grab active:cursor-grabbing">
                <ForceGraph2D
                  ref={graphRef}
                  graphData={graphData}
                  nodeLabel="name"
                  nodeColor={node => {
                    if (selectedNode?.id === node.id) return '#1e293b';
                    if (highlightNodes.has(node.id)) return '#2563eb';
                    return '#94a3b8';
                  }}
                  nodeRelSize={7}
                  linkColor={getLinkColor}
                  linkWidth={link => (highlightLinks.has(link) ? 3 : 1.5)}
                  linkDirectionalArrowLength={4}
                  linkDirectionalArrowRelPos={1}
                  onNodeHover={node => setHoverNode(node ? node.id : null)}
                  onNodeClick={node => setSelectedNode(node)}
                  d3VelocityDecay={0.4}
                  cooldownTicks={100}
                />
                
                {/* Legenda in de graaf */}
                <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-gray-200 text-[10px] space-y-2 pointer-events-none shadow-sm">
                  <div className="flex items-center gap-2"><div className="w-3 h-1 bg-green-500 rounded-full"></div> <span>Positief Sociaal</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-1 bg-red-500 rounded-full"></div> <span>Negatief Sociaal</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-1 bg-blue-500 rounded-full"></div> <span>Positief Werk</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-1 bg-orange-500 rounded-full"></div> <span>Negatief Werk</span></div>
                </div>
              </div>
            </motion.div>
            
            {/* Sidebar Details */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 flex-shrink-0">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                  <SafeIcon icon={FiUsers} className="text-blue-500" /> Details Leerling
                </h3>
                
                {selectedNode ? (
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                      <div className="text-xs text-blue-600 font-bold uppercase mb-1">Geselecteerd</div>
                      <div className="text-2xl font-black text-gray-900">{selectedNode.name}</div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-gray-700 border-b pb-2">Gekozen door anderen:</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-green-50 p-3 rounded-xl border border-green-100">
                          <div className="text-[10px] text-green-600 font-bold uppercase">Sociaal +</div>
                          <div className="text-xl font-bold">{graphData.links.filter(l => l.target.id === selectedNode.id && l.type === 'socialPos').length}x</div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                          <div className="text-[10px] text-blue-600 font-bold uppercase">Werk +</div>
                          <div className="text-xl font-bold">{graphData.links.filter(l => l.target.id === selectedNode.id && l.type === 'workPos').length}x</div>
                        </div>
                      </div>
                    </div>

                    <button onClick={() => setSelectedNode(null)} className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                      Deselecteer leerling
                    </button>
                  </div>
                ) : (
                  <div className="py-10 text-center text-gray-400">
                    <SafeIcon icon={FiMaximize2} className="text-4xl mx-auto mb-4 opacity-20" />
                    <p className="text-sm italic">Klik op een leerling in het netwerk om relaties en statistieken te bekijken.</p>
                  </div>
                )}
              </div>

              <div className="bg-indigo-900 text-white rounded-3xl shadow-xl p-8">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <SafeIcon icon={FiInfo} className="text-indigo-300" /> Tips voor interpretatie
                </h3>
                <ul className="text-xs space-y-3 text-indigo-100">
                  <li className="flex gap-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span><strong>Isolatie:</strong> Leerlingen met weinig inkomende lijnen hebben extra aandacht nodig.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span><strong>Wederkerigheid:</strong> Dubbele pijlen duiden op sterke vriendschappen.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span><strong>Subgroepen:</strong> Clusters in het netwerk laten de 'kliekjes' zien.</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sociogram;