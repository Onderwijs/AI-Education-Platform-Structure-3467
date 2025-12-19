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
  FiFileText, FiHelpCircle, FiDatabase, FiExternalLink
} = FiIcons;

const Sociogram = () => {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState('paste'); // 'paste' | 'upload'
  const [inputText, setInputText] = useState('');
  const [parsedData, setParsedData] = useState([]); // Raw rows
  const [headers, setHeaders] = useState([]);
  const [parseMessage, setParseMessage] = useState(null); // Voor warnings/errors

  // Mapping columns
  const [mapping, setMapping] = useState({
    name: '',
    socialPos: '',
    socialNeg: '',
    workPos: '',
    workNeg: ''
  });

  // Graph Data & View
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [viewMode, setViewMode] = useState('all'); // 'socialPos', 'socialNeg', 'workPos', 'workNeg', 'all'
  const [isGenerated, setIsGenerated] = useState(false);
  const [warnings, setWarnings] = useState([]);

  // Interaction
  const [hoverNode, setHoverNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const graphRef = useRef();

  // Controls
  const [showLabels, setShowLabels] = useState(true);
  const [linkDistance, setLinkDistance] = useState(50);
  const [searchTerm, setSearchTerm] = useState('');

  // --- LOGIC: TEMPLATE & EXAMPLE ---
  const handleDownloadTemplate = () => {
    // We genereren de Excel on-the-fly zodat hij direct werkt zonder server assets
    const wb = XLSX.utils.book_new();
    // Headers exact gelijk aan Google Sheets template
    const headers = [
      "Hoe heet je?", 
      "Met wie vind je het gezellig?", 
      "Met wie vind je het niet zo gezellig?", 
      "Met wie kan je goed samenwerken?", 
      "Met wie kan je niet zo goed samenwerken?"
    ];
    const data = [
      headers,
      ["Vul hier een naam in", "Naam 1, Naam 2", "", "Naam 3", ""], // Voorbeeld rij
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    
    // Kolombreedtes voor leesbaarheid
    ws['!cols'] = [{wch: 20}, {wch: 30}, {wch: 30}, {wch: 30}, {wch: 30}];
    
    XLSX.utils.book_append_sheet(wb, ws, "Sociogram Template");
    XLSX.writeFile(wb, "sociogram-template.xlsx");
  };

  const handleGoogleSheetOpen = () => {
    // Config: ID van de publieke Google Sheet Template
    // Indien nog niet ingesteld ("PLAATS_HIER..."), tonen we een vriendelijke melding.
    const SHEET_ID = "PLAATS_HIER_JOUW_SHEET_ID"; 
    
    // Check of de ID geldig is (geen placeholder en niet leeg)
    if (!SHEET_ID || SHEET_ID === "PLAATS_HIER_JOUW_SHEET_ID") {
      // Gebruikersvriendelijke melding (B1 niveau), geen technische details
      alert("⚠️ De Google Sheets-template is tijdelijk niet beschikbaar.\n\nGebruik de Excel-template of upload dit bestand later in Google Sheets.");
      return;
    }

    // Gebruik /copy om direct een kopie te forceren in het account van de gebruiker
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/copy`;
    
    // Open in nieuw tabblad met veilige rel attributen
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleLoadExample = () => {
    // Aangepast voorbeeld zodat het matcht met de nieuwe headers
    const exampleCSV = `Hoe heet je?,Met wie vind je het gezellig?,Met wie vind je het niet zo gezellig?,Met wie kan je goed samenwerken?,Met wie kan je niet zo goed samenwerken?
Anna,Pietje,Klaasje,Pietje,
Pietje,Anna,Jantje,Anna,
Klaasje,Pietje,,,
Jantje,Anna,Klaasje,,
Lisa,Anna,Pietje,Lisa,
Tom,Jantje,,Tom,`;
    
    setInputText(exampleCSV);
    setActiveTab('paste');
    // Trigger process direct na state update (via timeout om render te wachten)
    setTimeout(() => {
      // We roepen de process functie aan met de nieuwe tekst
      processText(exampleCSV);
    }, 100);
  };

  // --- LOGIC: PARSING ---
  const handleFileUpload = (e) => {
    setParseMessage(null);
    setHeaders([]);
    setParsedData([]);
    
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        // header:1 zorgt voor array van arrays
        const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });

        if (data && data.length > 0) {
          // Headers verwerken
          const headersRaw = data[0];
          const validHeaders = headersRaw.map((h, i) => (h && String(h).trim()) ? String(h).trim() : `Kolom ${i + 1}`);
          setHeaders(validHeaders);

          // Rijen verwerken
          const rows = data.slice(1).map(row => {
            let obj = {};
            validHeaders.forEach((key, i) => {
              const val = row[i];
              obj[key] = (val !== undefined && val !== null) ? String(val).trim() : '';
            });
            return obj;
          });
          setParsedData(rows);

          // Auto-map poging
          autoMapHeaders(validHeaders);

          if (rows.length === 0) {
            setParseMessage({ type: 'warning', text: "Het bestand bevat headers, maar geen datarijen." });
          }
        } else {
          setParseMessage({ type: 'error', text: "Het bestand lijkt leeg te zijn." });
        }
      } catch (err) {
        console.error(err);
        setParseMessage({ type: 'error', text: "Kon het bestand niet lezen. Is het een geldig Excel of CSV bestand?" });
      }
    };
    reader.onerror = () => {
      setParseMessage({ type: 'error', text: "Er ging iets mis bij het uploaden van het bestand." });
    };
    reader.readAsBinaryString(file);
  };

  const handlePasteProcess = () => {
    processText(inputText);
  };

  const processText = (textToProcess) => {
    setParseMessage(null);
    setHeaders([]);
    setParsedData([]);

    if (!textToProcess.trim()) return;

    try {
      // 1. Ruwe regels ophalen
      const rawLines = textToProcess.trim().split('\n');
      const lines = rawLines.filter(line => line.trim().length > 0);
      if (lines.length === 0) return;

      // 2. Separator Detectie (Heuristiek)
      const firstLine = lines[0];
      const candidates = [',', '\t', ';', '|'];
      // Volgorde van voorkeur
      let bestSeparator = ',';
      let maxCount = -1;

      candidates.forEach(sep => {
        // -1 want split geeft n+1 segmenten voor n separators
        const count = firstLine.split(sep).length - 1;
        if (count > maxCount) {
          maxCount = count;
          bestSeparator = sep;
        }
      });

      // 3. Headers parsen
      let headersRaw = firstLine.split(bestSeparator).map(h => h.trim());
      
      // Fallback als er geen separators zijn gevonden (1 kolom)
      if (headersRaw.length === 0 && firstLine.length > 0) {
        headersRaw = [firstLine];
      }

      // Valideer headers: vul lege headers op
      const validHeaders = headersRaw.map((h, i) => h ? h : `Kolom ${i + 1}`);
      setHeaders(validHeaders);

      // 4. Rijen parsen
      const rows = lines.slice(1).map(line => {
        const values = line.split(bestSeparator).map(v => v.trim());
        let obj = {};
        validHeaders.forEach((key, i) => {
          obj[key] = values[i] || '';
        });
        return obj;
      });
      setParsedData(rows);
      
      // Auto-map poging
      autoMapHeaders(validHeaders);

      // Feedback geven (niet blokkerend, Stap 2 blijft zichtbaar)
      if (maxCount === 0 && lines.length > 0) {
        setParseMessage({ type: 'warning', text: "⚠️ We konden je data niet automatisch splitsen. Koppel hieronder handmatig de kolommen." });
      } else if (rows.length === 0) {
        setParseMessage({ type: 'info', text: "Alleen kopjes gevonden. Voeg rijen toe." });
      }

    } catch (err) {
      console.error(err);
      setParseMessage({ type: 'error', text: "Kon de tekst niet verwerken. Controleer de invoer." });
    }
  };

  const autoMapHeaders = (availableHeaders) => {
    const newMapping = { ...mapping };
    const lowerHeaders = availableHeaders.map(h => h.toLowerCase());

    const findMatch = (keywords) => {
      const idx = lowerHeaders.findIndex(h => keywords.some(k => h.includes(k)));
      return idx !== -1 ? availableHeaders[idx] : '';
    };

    // Updated: Include EXACT phrases from the sociogram template
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
  const cleanName = (name) => {
    return name ? String(name).trim() : '';
  };

  const parseChoices = (cellValue) => {
    if (!cellValue) return [];
    // Normaliseer: vervang ; en | door , en split daarna op ,
    return String(cellValue)
      .replace(/[;|]/g, ',')
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);
  };

  const generateGraph = () => {
    // Validatie is nu disabled-state op de button, maar dubbele check:
    if (!mapping.name) return;

    const nodes = [];
    const links = [];
    const newWarnings = [];
    const studentNamesSet = new Set();

    // 1. Create Nodes
    parsedData.forEach(row => {
      const name = cleanName(row[mapping.name]);
      if (name) {
        if (studentNamesSet.has(name)) {
          if (!newWarnings.includes(`Dubbele naam gevonden: ${name}`)) {
            newWarnings.push(`Dubbele naam gevonden: ${name} (overgeslagen)`);
          }
        } else {
          studentNamesSet.add(name);
          nodes.push({ id: name, val: 1 });
        }
      }
    });

    // 2. Create Links
    parsedData.forEach(row => {
      const source = cleanName(row[mapping.name]);
      // Bron moet bestaan en een geldige naam zijn
      if (!source || !studentNamesSet.has(source)) return;

      const processLinkType = (colName, type) => {
        if (!colName) return;
        const targets = parseChoices(row[colName]);
        
        targets.forEach(target => {
          if (studentNamesSet.has(target)) {
            links.push({ source, target, type });
          } else {
            if (newWarnings.length < 10) {
              newWarnings.push(`Leerling '${source}' kiest onbekende naam: '${target}'`);
            }
          }
        });
      };

      if (mapping.socialPos) processLinkType(mapping.socialPos, 'socialPos');
      if (mapping.socialNeg) processLinkType(mapping.socialNeg, 'socialNeg');
      if (mapping.workPos) processLinkType(mapping.workPos, 'workPos');
      if (mapping.workNeg) processLinkType(mapping.workNeg, 'workNeg');
    });

    // 3. Set Data
    setGraphData({ nodes, links });
    setWarnings(newWarnings);
    setIsGenerated(true);

    // Reset view
    setTimeout(() => {
      if(graphRef.current) {
        graphRef.current.d3Force('link').distance(linkDistance);
        graphRef.current.zoomToFit(400);
      }
    }, 500);
  };

  // --- LOGIC: VISUALIZATION HELPERS ---
  const getLinkColor = (link) => {
    if (viewMode !== 'all' && link.type !== viewMode) return 'rgba(0,0,0,0)';
    if (highlightLinks.size > 0 && !highlightLinks.has(link)) return 'rgba(200,200,200,0.1)';
    
    switch(link.type) {
      case 'socialPos': return '#22c55e'; // Green
      case 'socialNeg': return '#ef4444'; // Red
      case 'workPos': return '#3b82f6'; // Blue
      case 'workNeg': return '#f97316'; // Orange
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
          hLinks.add(link);
          hNodes.add(sId);
          hNodes.add(tId);
        }
      });
    }

    setHighlightNodes(hNodes);
    setHighlightLinks(hLinks);
  }, [hoverNode, selectedNode, graphData, viewMode]);

  useEffect(() => {
    updateHighlight();
  }, [updateHighlight]);

  const handleNodeClick = (node) => {
    setSelectedNode(selectedNode === node.id ? null : node.id);
  };

  // --- LOGIC: STATS & EXPORT ---
  const getStats = () => {
    const stats = {};
    graphData.nodes.forEach(n => {
      stats[n.id] = { incoming: 0, outgoing: 0 };
    });

    graphData.links.forEach(link => {
      if (viewMode !== 'all' && link.type !== viewMode) return;
      const sId = typeof link.source === 'object' ? link.source.id : link.source;
      const tId = typeof link.target === 'object' ? link.target.id : link.target;
      
      if (stats[sId]) stats[sId].outgoing++;
      if (stats[tId]) stats[tId].incoming++;
    });

    return Object.entries(stats)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.incoming - a.incoming);
  };

  const downloadPNG = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = `sociogram-${viewMode}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const downloadCSV = () => {
    const stats = getStats();
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Naam,Gekozen (Incoming),Heeft Gekozen (Outgoing)\n"
      + stats.map(e => `${e.name},${e.incoming},${e.outgoing}`).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sociogram-stats-${viewMode}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  // Validatie voor button: Naam + minstens 1 relatie
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
        
        {/* SECTION 1: DATA INPUT */}
        {!isGenerated && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
             {/* 1️⃣ Uitlegblok */}
             <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 mb-8">
               <div className="flex items-start gap-4">
                 <div className="bg-blue-100 p-3 rounded-full hidden sm:block">
                   <SafeIcon icon={FiHelpCircle} className="text-2xl text-blue-600" />
                 </div>
                 <div>
                   <h2 className="text-xl font-bold text-gray-900 mb-3">Hoe gebruik je dit sociogram?</h2>
                   <div className="prose prose-sm text-gray-600">
                     <p className="mb-2"><strong>Je vult hier geen eigen inschattingen in.</strong> Deze tool werkt met antwoorden van leerlingen op een korte vragenlijst.</p>
                     <ul className="list-none space-y-2 pl-0">
                       <li className="flex items-start gap-2">
                         <span className="font-bold text-blue-600">Stap 1 –</span>
                         <span>Laat leerlingen individueel een vragenlijst invullen (bijvoorbeeld via Google Forms, Microsoft Forms of op papier).</span>
                       </li>
                       <li className="flex items-start gap-2">
                         <span className="font-bold text-blue-600">Stap 2 –</span>
                         <span>Zet de antwoorden in een tabel (Excel of Google Sheets). Elke rij is één leerling.</span>
                       </li>
                       <li className="flex items-start gap-2">
                         <span className="font-bold text-blue-600">Stap 3 –</span>
                         <span>Plak of upload die tabel hieronder. De tool maakt automatisch een interactief sociogram van de klas.</span>
                       </li>
                     </ul>
                   </div>
                 </div>
               </div>
             </div>

             {/* 2️⃣ Template Download Sectie */}
             <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="flex-1">
                 <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                   <SafeIcon icon={FiFileText} className="text-gray-500" />
                   Gebruik de standaard sociogram-template
                 </h3>
                 <p className="text-sm text-gray-600">
                   Download de Excel-template en vul per leerling de namen in. Meerdere namen in één cel scheid je met komma’s.
                 </p>
               </div>
               <div className="flex flex-col gap-2">
                 <div className="flex flex-col sm:flex-row gap-3">
                   <button 
                     onClick={handleDownloadTemplate}
                     className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 font-medium text-sm shadow-sm"
                   >
                     <SafeIcon icon={FiDownload} />
                     <span>Download Excel-template</span>
                   </button>
                   <button 
                     onClick={handleGoogleSheetOpen}
                     className="text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 font-medium text-sm"
                   >
                     <SafeIcon icon={FiExternalLink} />
                     <span>Open in Google Sheets</span>
                   </button>
                 </div>
                 {/* 3️⃣ Instructie tekst - AANGEPAST */}
                 <p className="text-xs text-gray-500 mt-2 text-center sm:text-right">
                   De link maakt automatisch een kopie van het sociogram-template in jouw Google Drive.
                 </p>
               </div>
             </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
              <div className="flex items-center space-x-2 mb-6 pb-4 border-b">
                <SafeIcon icon={FiGrid} className="text-2xl text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Stap 1: Data Invoeren</h2>
              </div>

              {/* Input Tabs & Example Button */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex space-x-2 p-1 bg-gray-100 rounded-lg">
                  <button 
                    onClick={() => setActiveTab('paste')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors text-sm ${activeTab === 'paste' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <SafeIcon icon={FiClipboard} />
                    <span>Plakken</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('upload')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors text-sm ${activeTab === 'upload' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <SafeIcon icon={FiUpload} />
                    <span>Uploaden</span>
                  </button>
                </div>
                
                {/* 4️⃣ Voorbeelddata Knop */}
                <button 
                  onClick={handleLoadExample}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors text-sm bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 ml-auto"
                >
                  <SafeIcon icon={FiDatabase} />
                  <span>Gebruik voorbeelddata</span>
                </button>
              </div>

              {/* Input Area */}
              {activeTab === 'paste' ? (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plak hier CSV of tab-gescheiden data</label>
                  <textarea 
                    className="w-full h-48 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    placeholder={`Hoe heet je?,Met wie vind je het gezellig?,Met wie vind je het niet zo gezellig?\nAnna,Pietje,Klaasje\nPietje,Anna,Jantje`}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onBlur={handlePasteProcess}
                  ></textarea>
                  {/* 5️⃣ Micro-hints */}
                  <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <SafeIcon icon={FiInfo} />
                    Tip: gebruik deze tool met antwoorden uit een vragenlijst. Namen in één cel scheid je met komma’s.
                  </p>
                </div>
              ) : (
                <div className="mb-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                  <SafeIcon icon={FiUpload} className="text-4xl text-gray-400 mx-auto mb-4" />
                  <input 
                    type="file" 
                    accept=".csv, .xlsx"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                  <p className="text-xs text-gray-500 mt-2">Ondersteunt .xlsx en .csv bestanden</p>
                </div>
              )}

              {/* Preview & Mapping - Zichtbaar zodra er headers zijn (wat vrijwel altijd zo is na input) */}
              {headers.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <SafeIcon icon={FiSettings} />
                    Stap 2: Kolommen Koppelen
                  </h3>
                  
                  {parseMessage && (
                    <div className={`mb-6 border rounded-lg p-4 flex items-start gap-3 ${parseMessage.type === 'error' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'}`}>
                      <SafeIcon icon={parseMessage.type === 'error' ? FiXCircle : FiInfo} className={`text-xl mt-0.5 ${parseMessage.type === 'error' ? 'text-red-500' : 'text-yellow-600'}`} />
                      <div>
                        <h4 className={`font-bold ${parseMessage.type === 'error' ? 'text-red-800' : 'text-yellow-800'}`}>
                          {parseMessage.type === 'error' ? 'Fout bij inlezen' : 'Let op'}
                        </h4>
                        <p className={`text-sm ${parseMessage.type === 'error' ? 'text-red-700' : 'text-yellow-700'}`}>
                          {parseMessage.text}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Naam Leerling <span className="text-red-500">*</span></label>
                      <select 
                        className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                        value={mapping.name}
                        onChange={(e) => handleMapChange('name', e.target.value)}
                      >
                        <option value="">-- Selecteer kolom --</option>
                        {headers.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gezellig (Social +)</label>
                      <select 
                        className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                        value={mapping.socialPos}
                        onChange={(e) => handleMapChange('socialPos', e.target.value)}
                      >
                        <option value="">-- Selecteer kolom --</option>
                        {headers.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Niet Gezellig (Social -)</label>
                      <select 
                        className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                        value={mapping.socialNeg}
                        onChange={(e) => handleMapChange('socialNeg', e.target.value)}
                      >
                        <option value="">-- Selecteer kolom --</option>
                        {headers.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Samenwerken (Work +)</label>
                      <select 
                        className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                        value={mapping.workPos}
                        onChange={(e) => handleMapChange('workPos', e.target.value)}
                      >
                        <option value="">-- Selecteer kolom --</option>
                        {headers.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Niet Samenwerken (Work -)</label>
                      <select 
                        className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                        value={mapping.workNeg}
                        onChange={(e) => handleMapChange('workNeg', e.target.value)}
                      >
                        <option value="">-- Selecteer kolom --</option>
                        {headers.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end items-center gap-4">
                    {!isFormValid && (
                      <span className="text-sm text-gray-500 italic">
                        Selecteer ten minste een naam en één relatie-kolom.
                      </span>
                    )}
                    <button 
                      onClick={generateGraph}
                      disabled={!isFormValid}
                      className={`px-6 py-3 rounded-lg font-bold flex items-center space-x-2 transition-colors ${isFormValid ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                    >
                      <SafeIcon icon={FiActivity} />
                      <span>Genereer Sociogram</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* SECTION 2: VISUALIZATION */}
        {isGenerated && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* MAIN COLUMN: Graph */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-8 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col h-[800px]"
            >
              {/* Toolbar */}
              <div className="p-4 border-b border-gray-100 flex flex-wrap gap-4 justify-between items-center bg-gray-50">
                <div className="flex space-x-2 overflow-x-auto pb-1">
                  {['all', 'socialPos', 'socialNeg', 'workPos', 'workNeg'].map(mode => (
                    <button 
                      key={mode} 
                      onClick={() => setViewMode(mode)}
                      className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors whitespace-nowrap ${viewMode === mode ? 'bg-white shadow text-gray-900 ring-1 ring-gray-200' : 'text-gray-600 hover:bg-gray-200'}`}
                    >
                      {mode === 'all' ? 'Alles' : getLegendLabel(mode)}
                    </button>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => setShowLabels(!showLabels)} className={`p-2 rounded hover:bg-gray-200 ${showLabels ? 'text-blue-600' : 'text-gray-400'}`} title="Labels aan/uit">
                    <SafeIcon icon={FiEye} />
                  </button>
                  <button onClick={downloadPNG} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Download PNG">
                    <SafeIcon icon={FiDownload} />
                  </button>
                  <button onClick={() => setIsGenerated(false)} className="px-3 py-1.5 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                    Nieuwe Data
                  </button>
                </div>
              </div>

              {/* Warning Banner */}
              {warnings.length > 0 && (
                <div className="bg-orange-50 px-4 py-2 text-xs text-orange-800 border-b border-orange-100">
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <SafeIcon icon={FiAlertTriangle} /> Waarschuwingen (max 5):
                  </div>
                  <ul className="list-disc list-inside">
                    {warnings.slice(0, 5).map((w, i) => <li key={i}>{w}</li>)}
                    {warnings.length > 5 && <li>...en nog {warnings.length - 5} andere meldingen.</li>}
                  </ul>
                </div>
              )}

              {/* Graph Container */}
              <div className="flex-grow relative bg-slate-50 cursor-move">
                <ForceGraph2D
                  ref={graphRef}
                  width={800} // Responsive wrapper handles this usually, but fixed for simplicity
                  height={700}
                  graphData={graphData}
                  nodeLabel="id"
                  nodeColor={node => (highlightNodes.has(node.id) ? '#2563eb' : '#64748b')}
                  nodeRelSize={6}
                  linkColor={getLinkColor}
                  linkWidth={link => highlightLinks.has(link) ? 2 : 1}
                  linkDirectionalArrowLength={3.5}
                  linkDirectionalArrowRelPos={1}
                  onNodeHover={node => {
                    setHoverNode(node ? node.id : null);
                    // Reset cursor
                    document.body.style.cursor = node ? 'pointer' : null;
                  }}
                  onNodeClick={handleNodeClick}
                  d3VelocityDecay={0.3}
                  cooldownTicks={100}
                />
                
                {/* Search Overlay */}
                <div className="absolute top-4 left-4 w-64">
                  <div className="relative">
                    <SafeIcon icon={FiSearch} className="absolute left-3 top-2.5 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Zoek leerling..." 
                      className="w-full pl-10 pr-4 py-2 bg-white/90 backdrop-blur border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Legenda Overlay */}
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

            {/* SIDEBAR: Stats */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-4 space-y-6"
            >
              {/* Selected Node Details */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <SafeIcon icon={FiUsers} className="text-blue-500" />
                  Details
                </h3>
                {selectedNode || hoverNode ? (
                  <div>
                    <div className="text-2xl font-bold text-gray-800 mb-4">{selectedNode || hoverNode}</div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-blue-50 p-3 rounded-lg text-center">
                        <span className="block text-xs text-blue-600 font-bold uppercase">Gekozen door</span>
                        <span className="text-xl font-bold text-blue-900">
                          {graphData.links.filter(l => (typeof l.target === 'object' ? l.target.id : l.target) === (selectedNode || hoverNode) && (viewMode === 'all' || l.type === viewMode)).length}
                        </span>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg text-center">
                        <span className="block text-xs text-green-600 font-bold uppercase">Heeft gekozen</span>
                        <span className="text-xl font-bold text-green-900">
                          {graphData.links.filter(l => (typeof l.source === 'object' ? l.source.id : l.source) === (selectedNode || hoverNode) && (viewMode === 'all' || l.type === viewMode)).length}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500 italic">
                      {selectedNode ? "Selectie vastgezet (klik nogmaals om los te laten)" : "Hover weergave"}
                    </p>
                  </div>
                ) : (
                  <div className="text-gray-400 text-sm text-center py-8">
                    Selecteer of hover over een leerling voor details.
                  </div>
                )}
              </div>

              {/* Ranking List */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex flex-col max-h-[500px]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <SafeIcon icon={FiActivity} className="text-orange-500" />
                    Meest Gekozen
                  </h3>
                  <button onClick={downloadCSV} className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                    <SafeIcon icon={FiDownload} /> CSV
                  </button>
                </div>
                <div className="overflow-y-auto pr-2 flex-grow space-y-2 custom-scrollbar">
                  {getStats().map((stat, idx) => (
                    <div key={stat.name} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg text-sm border border-transparent hover:border-gray-100">
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${idx < 3 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                          {idx + 1}
                        </span>
                        <span className="font-medium text-gray-700">{stat.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-gray-900">{stat.incoming}</span>
                        <span className="text-xs text-gray-400">Keuzes</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
      
      {/* 7️⃣ Tech Choice Note (Internal) */}
      {/* 
        Tech choice (richtinggevend):
        Gebruik een client-side force-directed graph (bijv. D3-force of react-force-graph).
        Alles draait in de browser.
        Performance geschikt voor ±25–30 leerlingen met hover-highlighting.
      */}
    </div>
  );
};

export default Sociogram;