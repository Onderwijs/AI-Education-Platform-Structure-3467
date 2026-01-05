import React,{useState,useRef,useEffect,useCallback} from 'react';
import {motion,AnimatePresence} from 'framer-motion';
import SimpleHero from '../../components/common/SimpleHero';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import * as XLSX from 'xlsx';
import ForceGraph2D from 'react-force-graph-2d';

const {FiUpload,FiClipboard,FiSettings,FiActivity,FiDownload,FiSearch,FiEye,FiAlertTriangle,FiCheck,FiUsers,FiGrid,FiXCircle,FiInfo,FiFileText,FiHelpCircle,FiDatabase,FiExternalLink,FiChevronDown,FiChevronUp,FiFilter,FiMaximize2,FiSend,FiCheckCircle,FiCopy,FiTerminal,FiShare2,FiLink,FiLoader}=FiIcons;

const Sociogram=()=> {
  // --- STATE ---
  const [activeTab,setActiveTab]=useState('sheet');
  const [inputText,setInputText]=useState('');
  const [sheetLink,setSheetLink]=useState('');
  const [isLoading,setIsLoading]=useState(false);
  const [parsedData,setParsedData]=useState([]);
  const [headers,setHeaders]=useState([]);
  const [mapping,setMapping]=useState({name: '',socialPos: '',socialNeg: '',workPos: '',workNeg: ''});

  // UI State
  const [isExampleData,setIsExampleData]=useState(false);
  const [isStep2Expanded,setIsStep2Expanded]=useState(true);
  const [isGenerated,setIsGenerated]=useState(false);
  const [viewMode,setViewMode]=useState('all');

  // Guidance UI State
  const [isScriptExpanded,setIsScriptExpanded]=useState(true);
  const [scriptCopied,setScriptCopied]=useState(false);

  // Graph Data & Interaction
  const [graphData,setGraphData]=useState({nodes: [],links: []});
  const [hoverNode,setHoverNode]=useState(null);
  const [selectedNode,setSelectedNode]=useState(null);
  const [highlightNodes,setHighlightNodes]=useState(new Set());
  const [highlightLinks,setHighlightLinks]=useState(new Set());
  const graphRef=useRef();

  // --- AUTO FOCUS & CENTER LOGIC ---
  useEffect(()=> {
    if (isGenerated && graphRef.current) {
      const delay=isExampleData ? 100 : 400;
      const timer=setTimeout(()=> {
        graphRef.current.zoomToFit(800,120);
        graphRef.current.centerAt(0,0,400);
      },delay);
      return ()=> clearTimeout(timer);
    }
  },[isGenerated,graphData,isExampleData]);

  // --- GOOGLE APPS SCRIPT CODE (STRIKT ZONDER BROWSER.MSGBOX) ---
  const googleScript=`function createSociogramForm() {
  var form = FormApp.create('Interactief Sociogram Vragenlijst');
  form.setTitle('Sociogram: Hoe werken we samen in de klas?')
      .setDescription('Vul deze vragenlijst eerlijk in. Je antwoorden zijn alleen zichtbaar voor de leraar.');
  
  form.addTextItem().setTitle('Hoe heet je?').setRequired(true);
  form.addTextItem().setTitle('Met wie vind je het gezellig?').setHelpText('Meerdere namen scheiden met een komma.');
  form.addTextItem().setTitle('Met wie vind je het niet zo gezellig?');
  form.addTextItem().setTitle('Met wie kan je goed samenwerken?');
  form.addTextItem().setTitle('Met wie kan je niet zo goed samenwerken?');

  Logger.log('Bevestiging: Het sociogramformulier is succesvol aangemaakt.');
  Logger.log('Docent-link (bewerken): ' + form.getEditUrl());
  Logger.log('Leerling-link (invullen): ' + form.getPublishedUrl());
}`;

  const copyScript=()=> {
    navigator.clipboard.writeText(googleScript);
    setScriptCopied(true);
    setTimeout(()=> setScriptCopied(false),2000);
  };

  // --- DATA FETCHING LOGIC ---
  const fetchSheetData=async (url)=> {
    const id=url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)?.[1];
    if (!id) throw new Error("Ongeldige link. Zorg dat de link verwijst naar een Google Sheet.");
    const csvUrl=`https://docs.google.com/spreadsheets/d/${id}/export?format=csv`;
    const response=await fetch(csvUrl);
    if (!response.ok) throw new Error("Kon data niet ophalen. Is de sheet openbaar of gedeeld met 'Iedereen met de link'?");
    const text=await response.text();
    return text;
  };

  const processText=(textToProcess,allowAutoMap=true)=> {
    if (!textToProcess.trim() || isExampleData) return;
    try {
      const lines=textToProcess.trim().split('\n').filter(l=> l.trim().length > 0);
      if (lines.length===0) return;
      const candidates=[',','\t',';','|'];
      let bestSep=',';
      let maxCount=-1;
      candidates.forEach(sep=> {
        const count=lines[0].split(sep).length - 1;
        if (count > maxCount) {
          maxCount=count;
          bestSep=sep;
        }
      });
      const validHeaders=lines[0].split(bestSep).map((h,i)=> h.trim().replace(/^"|"$/g,'') || `Kolom ${i + 1}`);
      setHeaders(validHeaders);
      const rows=lines.slice(1).map(line=> {
        const values=line.match(/(".*?"|[^",\t;|]+)(?=\s*[,\t;|]|\s*$)/g) || [];
        let obj={};
        validHeaders.forEach((key,i)=> {
          obj[key]=values[i] ? values[i].trim().replace(/^"|"$/g,'') : '';
        });
        return obj;
      });
      setParsedData(rows);
      if (allowAutoMap) autoMapHeaders(validHeaders);
    } catch (err) {
      console.error("Parse error:",err);
    }
  };

  const handleLoadExample=()=> {
    const exampleCSV=`Hoe heet je?,Met wie vind je het gezellig?,Met wie vind je het niet zo gezellig?,Met wie kan je goed samenwerken?,Met wie kan je niet zo goed samenwerken?
Anna,"Pietje,Jantje",Klaasje,Pietje,Pietje
Anna,Jantje,Anna,Klaasje,Pietje
,,,,Jantje,Anna
Klaasje,,Lisa,Anna,Pietje
Lisa,Tom,Jantje,,Tom,`;
    setInputText(exampleCSV);
    setActiveTab('paste');
    setIsExampleData(true);
    setIsStep2Expanded(false);
    processText(exampleCSV,true);
    setTimeout(()=> generateGraph(),200);
  };

  const autoMapHeaders=(availableHeaders)=> {
    const lowerHeaders=availableHeaders.map(h=> h.toLowerCase());
    const findMatch=(keywords)=> {
      const idx=lowerHeaders.findIndex(h=> keywords.some(k=> h.includes(k)));
      return idx !==-1 ? availableHeaders[idx] : '';
    };
    setMapping({
      name: findMatch(['hoe heet je','naam','leerling','student']),
      socialPos: findMatch(['gezellig','social+','vrienden']),
      socialNeg: findMatch(['niet gezellig','social-','liever niet']),
      workPos: findMatch(['samenwerken','work+','groepje']),
      workNeg: findMatch(['niet samenwerken','work-','lastig'])
    });
  };

  const handleFileUpload=(e)=> {
    setIsExampleData(false);
    setIsStep2Expanded(true);
    const file=e.target.files[0];
    if (!file) return;
    const reader=new FileReader();
    reader.onload=(evt)=> {
      try {
        const bstr=evt.target.result;
        const wb=XLSX.read(bstr,{type: 'binary'});
        const ws=wb.Sheets[wb.SheetNames[0]];
        const data=XLSX.utils.sheet_to_json(ws,{header: 1,defval: ""});
        if (data && data.length > 0) {
          const validHeaders=data[0].map((h,i)=> (h && String(h).trim()) ? String(h).trim() : `Kolom ${i + 1}`);
          setHeaders(validHeaders);
          const rows=data.slice(1).map(row=> {
            let obj={};
            validHeaders.forEach((key,i)=> obj[key]=(row[i] !==undefined) ? String(row[i]).trim() : '');
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

  const handleGenerateClick=async ()=> {
    if (activeTab==='sheet') {
      if (!sheetLink.includes('google.com/spreadsheets')) {
        alert("Voer een geldige Google Sheets link in.");
        return;
      }
      setIsLoading(true);
      try {
        const csvText=await fetchSheetData(sheetLink);
        processText(csvText,true);
        setIsStep2Expanded(true);
      } catch (err) {
        alert(err.message);
      } finally {
        setIsLoading(false);
      }
    } else if (activeTab==='paste') {
      processText(inputText,true);
      generateGraph();
    } else {
      generateGraph();
    }
  };

  const generateGraph=()=> {
    if (!mapping.name) return;
    const nodes=[];
    const links=[];
    const studentNamesSet=new Set();
    parsedData.forEach(row=> {
      const name=row[mapping.name]?.trim();
      if (name && !studentNamesSet.has(name)) {
        studentNamesSet.add(name);
        nodes.push({id: name,name: name});
      }
    });
    parsedData.forEach(row=> {
      const source=row[mapping.name]?.trim();
      if (!source || !studentNamesSet.has(source)) return;
      const processLink=(col,type)=> {
        if (!col) return;
        const val=String(row[col] || '');
        const targets=val.split(/[,\n;]/).map(s=> s.trim()).filter(s=> s.length > 0);
        targets.forEach(target=> {
          if (studentNamesSet.has(target)) {
            links.push({source,target,type});
          }
        });
      };
      processLink(mapping.socialPos,'socialPos');
      processLink(mapping.socialNeg,'socialNeg');
      processLink(mapping.workPos,'workPos');
      processLink(mapping.workNeg,'workNeg');
    });
    setGraphData({nodes,links});
    setIsGenerated(true);
  };

  const getLinkColor=(link)=> {
    if (viewMode !=='all' && link.type !==viewMode) return 'transparent';
    const isHighlighted=highlightLinks.size > 0 && highlightLinks.has(link);
    const opacity=highlightLinks.size > 0 && !isHighlighted ? '0.05' : '0.6';
    switch (link.type) {
      case 'socialPos': return `rgba(34,197,94,${opacity})`;
      case 'socialNeg': return `rgba(239,68,68,${opacity})`;
      case 'workPos': return `rgba(59,130,246,${opacity})`;
      case 'workNeg': return `rgba(249,115,22,${opacity})`;
      default: return `rgba(156,163,175,${opacity})`;
    }
  };

  const updateHighlight=useCallback(()=> {
    const hNodes=new Set();
    const hLinks=new Set();
    const activeId=hoverNode || (selectedNode ? selectedNode.id : null);
    if (activeId) {
      hNodes.add(activeId);
      graphData.links.forEach(link=> {
        if (viewMode !=='all' && link.type !==viewMode) return;
        const sId=typeof link.source==='object' ? link.source.id : link.source;
        const tId=typeof link.target==='object' ? link.target.id : link.target;
        if (sId===activeId || tId===activeId) {
          hLinks.add(link);
          hNodes.add(sId);
          hNodes.add(tId);
        }
      });
    }
    setHighlightNodes(hNodes);
    setHighlightLinks(hLinks);
  },[hoverNode,selectedNode,graphData,viewMode]);

  useEffect(()=> {
    updateHighlight();
  },[updateHighlight]);

  const isFormValid=!!mapping.name && (!!mapping.socialPos || !!mapping.socialNeg || !!mapping.workPos || !!mapping.workNeg);
  const hasData=inputText.trim().length > 0 || parsedData.length > 0 || sheetLink.trim().length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHero title="Interactief Sociogram" subtitle="Visualiseer de sociale dynamiek en samenwerkingsvoorkeuren in jouw klas." color="from-blue-600 to-indigo-700" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!isGenerated && (
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-12 mb-12">
            {[ 
              {num: 1,label: 'Verzamel antwoorden',icon: FiSend},
              {num: 2,label: 'Controleer & exporteer',icon: FiDownload},
              {num: 3,label: 'Upload & visualiseer',icon: FiEye} 
            ].map((step,i)=> (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-md"> {step.num} </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Stap {step.num}</span>
                  <span className="text-sm font-bold text-gray-700">{step.label}</span>
                </div>
                {i < 2 && <div className="hidden md:block w-12 h-0.5 bg-gray-200"></div>}
              </div>
            ))}
          </div>
        )}

        {!isGenerated ? (
          <motion.div initial={{opacity: 0,y: 20}} animate={{opacity: 1,y: 0}}>
            {/* STAP 1 – VERZAMELEN */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><SafeIcon icon={FiSend} className="text-xl" /></div>
                <h2 className="text-2xl font-bold text-gray-900">Stap 1 – Verzamel antwoorden van leerlingen</h2>
              </div>
              <div className="space-y-4">
                {/* OPTION A */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <button onClick={()=> setIsScriptExpanded(!isScriptExpanded)} className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors text-left" >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0"> <SafeIcon icon={FiShare2} /> </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Optie A: Automatisch een Google Form genereren <span className="text-green-600 text-xs font-medium ml-2 bg-green-50 px-2 py-0.5 rounded-full">(Aanbevolen)</span></h3>
                        <p className="text-sm text-gray-500">De makkelijkste manier om veilig en anoniem data van je klas te verzamelen.</p>
                      </div>
                    </div>
                    <SafeIcon icon={isScriptExpanded ? FiChevronUp : FiChevronDown} className="text-gray-400" />
                  </button>
                  <AnimatePresence>
                    {isScriptExpanded && (
                      <motion.div initial={{height: 0}} animate={{height: 'auto'}} exit={{height: 0}} className="overflow-hidden">
                        <div className="p-6 pt-0 border-t border-gray-100 bg-gray-50/50">
                          <div className="mt-6 bg-white p-6 rounded-xl border border-gray-200">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                              <div>
                                <h5 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-4">Stappenplan Sociogram (Google Form automatisch aanmaken)</h5>
                                <ol className="space-y-4 text-sm text-gray-700">
                                  <li className="flex gap-3">
                                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">1</span>
                                    <div>
                                      <strong className="block text-gray-900">Ga naar Google Apps Script</strong>
                                      <span>Ga naar <a href="https://script.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">script.google.com</a> en klik op <strong>Nieuw project</strong>.</span>
                                    </div>
                                  </li>
                                  <li className="flex gap-3">
                                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">2</span>
                                    <div>
                                      <strong className="block text-gray-900">Verwijder de standaardcode (belangrijk!)</strong>
                                      <span>In het nieuwe project staat standaard code (<code>function myFunction() &#123; &#125;</code>). Selecteer alle code en verwijder deze volledig.</span>
                                    </div>
                                  </li>
                                  <li className="flex gap-3">
                                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">3</span>
                                    <div>
                                      <strong className="block text-gray-900">Plak het sociogram-script</strong>
                                      <span>Plak nu het volledige Sociogram-script (hiernaast) in het lege venster.</span>
                                    </div>
                                  </li>
                                  <li className="flex gap-3">
                                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">4</span>
                                    <div>
                                      <strong className="block text-gray-900">Opslaan</strong>
                                      <span>Klik op <strong>Opslaan</strong> (Ctrl/Cmd + S).</span>
                                    </div>
                                  </li>
                                  <li className="flex gap-3">
                                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">5</span>
                                    <div>
                                      <strong className="block text-gray-900">Script uitvoeren</strong>
                                      <span>Selecteer bovenin de functie <code>createSociogramForm</code> en klik op <strong>Uitvoeren</strong>.</span>
                                    </div>
                                  </li>
                                  <li className="flex gap-3">
                                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">6</span>
                                    <div>
                                      <strong className="block text-gray-900">Machtigingen goedkeuren</strong>
                                      <span>Sta Google toe om het formulier aan te maken in je Drive. (Kies account &rarr; Geavanceerd &rarr; Ga naar ... (onveilig)).</span>
                                    </div>
                                  </li>
                                  <li className="flex gap-3">
                                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">7</span>
                                    <div>
                                      <strong className="block text-gray-900">Open het Uitvoeringslogboek (essentieel)</strong>
                                      <span>Klik op <strong>Uitvoeringslogboek</strong>. Je ziet daar twee links:</span>
                                      <ul className="mt-1 list-disc pl-4 space-y-1 text-xs">
                                        <li><strong>Docent-link (bewerken)</strong> &rarr; alleen voor jou</li>
                                        <li><strong>Leerling-link (invullen)</strong> &rarr; deel deze met je klas</li>
                                      </ul>
                                      <p className="mt-1 text-xs italic text-blue-600">Tip: de leerling-link eindigt altijd op /viewform</p>
                                    </div>
                                  </li>
                                </ol>
                              </div>
                              <div className="relative group">
                                <button onClick={copyScript} className={`absolute top-3 right-3 z-10 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${scriptCopied ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>
                                  <SafeIcon icon={scriptCopied ? FiCheck : FiCopy} /> {scriptCopied ? 'Gekopieerd!' : 'Kopieer Script'}
                                </button>
                                <div className="bg-gray-900 rounded-xl p-4 pt-12 h-full max-h-[400px] overflow-y-auto shadow-inner border border-gray-800">
                                  <pre className="text-[10px] font-mono text-blue-300 leading-relaxed">{googleScript}</pre>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {/* OPTION B */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"> <SafeIcon icon={FiFileText} /> </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Optie B: Gebruik de Google Sheet template</h3>
                        <p className="text-sm text-gray-500">Download de Google Sheet template en vul de antwoorden in.</p>
                        <div className="mt-3">
                          <a href="https://docs.google.com/spreadsheets/d/1Qc5Ow3lAWUCWjBW61MKPPVvUMTOPBHAz/copy" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700" >
                            <SafeIcon icon={FiDownload} /> <span>Download Template (Google Sheets)</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* STAP 3 – UPLOAD & VISUALISEER */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><SafeIcon icon={FiGrid} className="text-xl" /></div>
                <h2 className="text-2xl font-bold text-gray-900">Stap 3 – Upload & visualiseer</h2>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 font-sans">
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex space-x-2 p-1 bg-gray-100 rounded-lg">
                    <button onClick={()=> {setActiveTab('sheet');setIsExampleData(false);}} className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors text-sm ${activeTab==='sheet' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                      <SafeIcon icon={FiLink} /> <span>Google Sheet Link</span>
                    </button>
                    <button onClick={()=> {setActiveTab('paste');setIsExampleData(false);}} className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors text-sm ${activeTab==='paste' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                      <SafeIcon icon={FiClipboard} /> <span>Plakken</span>
                    </button>
                    <button onClick={()=> {setActiveTab('upload');setIsExampleData(false);}} className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors text-sm ${activeTab==='upload' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                      <SafeIcon icon={FiUpload} /> <span>Uploaden</span>
                    </button>
                  </div>
                  <div className="ml-auto text-right">
                    <button onClick={handleLoadExample} className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors text-sm bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200">
                      <SafeIcon icon={FiDatabase} /> <span>Test met voorbeelddata</span>
                    </button>
                  </div>
                </div>

                {!isExampleData && (
                  <>
                    {activeTab==='sheet' && (
                      <div className="space-y-4">
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                          <p className="text-sm text-blue-800 font-medium"> Gebruik deze optie als je antwoorden hebt verzameld via Google Forms. Leestoegang is voldoende. </p>
                        </div>
                        <div className="relative">
                          <SafeIcon icon={FiLink} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input type="text" className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-sans text-sm bg-gray-50" placeholder="Plak hier de link naar je Google Sheet..." value={sheetLink} onChange={(e)=> setSheetLink(e.target.value)} />
                        </div>
                      </div>
                    )}
                    {activeTab==='paste' && (
                      <textarea className="w-full h-48 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-mono text-sm bg-gray-50" placeholder="Plak hier de kolommen uit uw Excel..." value={inputText} onChange={(e)=> setInputText(e.target.value)} onBlur={()=> processText(inputText,true)}></textarea>
                    )}
                    {activeTab==='upload' && (
                      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-10 text-center">
                        <input type="file" accept=".csv,.xlsx" onChange={handleFileUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                      </div>
                    )}
                    <div className="mt-6">
                      <button onClick={handleGenerateClick} disabled={!hasData || isLoading} className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${hasData && !isLoading ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:-translate-y-0.5' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`} >
                        {isLoading ? <SafeIcon icon={FiLoader} className="animate-spin" /> : <SafeIcon icon={FiActivity} />}
                        <span>{isLoading ? 'Gegevens ophalen...' : 'Gegevens verwerken'}</span>
                      </button>
                    </div>

                    {headers.length > 0 && isStep2Expanded && (
                      <div className="mt-10 pt-8 border-t border-gray-100">
                        <div className="mb-6">
                          <h4 className="font-bold text-gray-900 flex items-center gap-2"> <SafeIcon icon={FiSettings} className="text-blue-600" /> Koppel de kolommen </h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                          {[ 
                            {id: 'name',label: 'Naam Leerling',req: true},
                            {id: 'socialPos',label: 'Gezellig (Social +)'},
                            {id: 'socialNeg',label: 'Niet Gezellig (Social -)'},
                            {id: 'workPos',label: 'Samenwerken (Work +)'},
                            {id: 'workNeg',label: 'Niet Samenwerken (Work -)'} 
                          ].map(field=> (
                            <div key={field.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{field.label} {field.req && <span className="text-red-500">*</span>}</label>
                              <select className={`w-full p-2.5 border rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 ${mapping[field.id] ? 'border-blue-300' : 'border-gray-300'}`} value={mapping[field.id]} onChange={(e)=> setMapping(prev=> ({...prev,[field.id]: e.target.value}))}>
                                <option value="">-- Kies kolom --</option>
                                {headers.map(h=> <option key={h} value={h}>{h}</option>)}
                              </select>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-end pt-6 border-t border-gray-100">
                          <button onClick={generateGraph} disabled={!isFormValid} className={`px-12 py-4 rounded-xl font-bold flex items-center space-x-2 transition-all shadow-lg ${isFormValid ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:-translate-y-0.5' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                            <SafeIcon icon={FiActivity} /> <span>Genereer Sociogram</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          /* RESULTATEN SECTIE */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <motion.div initial={{opacity: 0,scale: 0.95}} animate={{opacity: 1,scale: 1}} className="lg:col-span-8 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[750px] relative">
              <div className="p-4 border-b border-gray-100 flex flex-wrap gap-4 justify-between items-center bg-gray-50/50 backdrop-blur-md z-10">
                <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200">
                  {['all','socialPos','socialNeg','workPos','workNeg'].map(mode=> (
                    <button key={mode} onClick={()=> setViewMode(mode)} className={`px-4 py-2 text-xs rounded-lg font-bold transition-all ${viewMode===mode ? 'bg-gray-900 text-white shadow-md' : 'hover:bg-gray-100 text-gray-600'}`}>
                      {mode==='all' ? 'Alles' : mode==='socialPos' ? 'Sociaal+' : mode==='socialNeg' ? 'Sociaal-' : mode==='workPos' ? 'Werk+' : 'Werk-'}
                    </button>
                  ))}
                </div>
                <button onClick={()=> {setIsGenerated(false);setIsExampleData(false);setHeaders([]);setParsedData([]);setSheetLink('');setInputText('');}} className="px-4 py-2 text-xs bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 font-bold flex items-center gap-2">
                  <SafeIcon icon={FiGrid} /> Andere Data
                </button>
              </div>
              <div className="flex-grow bg-slate-50 relative cursor-grab active:cursor-grabbing">
                <ForceGraph2D 
                  ref={graphRef} 
                  graphData={graphData} 
                  nodeLabel="name" 
                  nodeColor={node=> selectedNode?.id===node.id ? '#1e293b' : (highlightNodes.has(node.id) ? '#2563eb' : '#94a3b8')} 
                  nodeRelSize={7} 
                  linkColor={getLinkColor} 
                  linkWidth={link=> (highlightLinks.size > 0 && highlightLinks.has(link) ? 3 : 1.5)} 
                  linkDirectionalArrowLength={4} 
                  linkDirectionalArrowRelPos={1} 
                  onNodeHover={node=> setHoverNode(node ? node.id : null)} 
                  onNodeClick={node=> setSelectedNode(node)} 
                  d3VelocityDecay={0.4} 
                  cooldownTicks={100} 
                  nodeCanvasObject={(node,ctx,globalScale)=> {
                    const label=node.name;
                    const fontSize=14 / globalScale;
                    ctx.font=`${fontSize}px Sans-Serif`;
                    const r=6;
                    ctx.beginPath();
                    ctx.arc(node.x,node.y,r,0,2 * Math.PI,false);
                    ctx.fillStyle=selectedNode?.id===node.id ? '#1e293b' : (highlightNodes.has(node.id) ? '#2563eb' : '#94a3b8');
                    ctx.fill();
                    if (globalScale > 0.4) {
                      ctx.textAlign='center';
                      ctx.textBaseline='middle';
                      ctx.fillStyle='#1e293b';
                      ctx.strokeStyle='rgba(255,255,255,0.9)';
                      ctx.lineWidth=3 / globalScale;
                      ctx.strokeText(label,node.x,node.y + r + fontSize + 2);
                      ctx.fillText(label,node.x,node.y + r + fontSize + 2);
                    }
                  }} 
                />
              </div>
            </motion.div>

            <motion.div initial={{opacity: 0,x: 20}} animate={{opacity: 1,x: 0}} className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 flex-shrink-0">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg"> <SafeIcon icon={FiUsers} className="text-blue-500" /> Details Leerling </h3>
                {selectedNode ? (
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                      <div className="text-2xl font-black text-gray-900">{selectedNode.name}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="bg-green-50 p-3 rounded-xl border border-green-100">
                        <div className="text-[10px] text-green-600 font-bold uppercase">Sociaal +</div>
                        <div className="text-xl font-bold">{graphData.links.filter(l=> (typeof l.target==='object' ? l.target.id : l.target)===selectedNode.id && l.type==='socialPos').length}x</div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                        <div className="text-[10px] text-blue-600 font-bold uppercase">Werk +</div>
                        <div className="text-xl font-bold">{graphData.links.filter(l=> (typeof l.target==='object' ? l.target.id : l.target)===selectedNode.id && l.type==='workPos').length}x</div>
                      </div>
                    </div>
                    <button onClick={()=> setSelectedNode(null)} className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors">Deselecteer</button>
                  </div>
                ) : (
                  <div className="py-10 text-center text-gray-400 italic text-sm"> Klik op een leerling in het netwerk om relaties te bekijken. </div>
                )}
              </div>
              <div className="bg-indigo-900 text-white rounded-3xl shadow-xl p-8">
                <h3 className="font-bold mb-4 flex items-center gap-2"><SafeIcon icon={FiInfo} className="text-indigo-300" /> Interpretatie</h3>
                <ul className="text-xs space-y-3 text-indigo-100">
                  <li><strong>Isolatie:</strong> Leerlingen met weinig inkomende lijnen hebben extra aandacht nodig.</li>
                  <li><strong>Wederkerigheid:</strong> Dubbele pijlen duiden op sterke vriendschappen.</li>
                  <li><strong>Groepsvorming:</strong> Clusters van leerlingen geven inzicht in subgroepen.</li>
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