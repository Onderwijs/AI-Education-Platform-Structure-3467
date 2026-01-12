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

  // --- GOOGLE APPS SCRIPT CODE (EXACT REPLACEMENT) ---
  const googleScript=`function createSociogramForm() {
  var form = FormApp.create('Interactief Sociogram Vragenlijst');
  
  form.setTitle('Sociogram: Hoe werken we samen in de klas?')
      .setDescription(
        'Vul deze vragenlijst eerlijk in. Je antwoorden zijn alleen zichtbaar voor de leraar.\\n\\n' +
        'Gebruik alleen namen van klasgenoten. ' +
        'Schrijf geen woorden zoals "niemand" of "iedereen".'
      );
  
  form.addTextItem()
      .setTitle('Wat is je voornaam?')
      .setRequired(true);

  addNameQuestion(form, 'Met wie vind je het gezellig?');
  addNameQuestion(form, 'Met wie vind je het niet zo gezellig?');
  addNameQuestion(form, 'Met wie kan je goed samenwerken?');
  addNameQuestion(form, 'Met wie kan je niet zo goed samenwerken?');

  Logger.log('Link naar het formulier (bewerken): ' + form.getEditUrl());
  Logger.log('Link om te delen met leerlingen: ' + form.getPublishedUrl());
}

function addNameQuestion(form, title) {
  var validation = FormApp.createTextValidation()
    .requireTextDoesNotMatchPattern('(niemand|iedereen)')
    .setHelpText(
      'Gebruik alleen namen van klasgenoten. ' +
      'Schrijf geen "niemand" of "iedereen".'
    )
    .build();

  form.addTextItem()
    .setTitle(title)
    .setHelpText(
      'Meerdere namen scheiden met een komma.\\n' +
      'Schrijf geen "niemand" of "iedereen", alleen namen.'
    )
    .setValidation(validation);
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
            <div className="mb-10 p-6 bg-white rounded-2xl shadow-sm border border-blue-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <SafeIcon icon={FiInfo} className="text-blue-600" />
                Zo gebruik je het Sociogram (kort uitgelegd)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
                <div className="space-y-3">
                  <p className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">1</span>
                    <span>Gebruik hieronder <strong>Optie A – Automatisch Google Form genereren</strong>.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">2</span>
                    <span>Kopieer het script en plak dit in een leeg Google Apps Script-project.</span>
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">3</span>
                    <span>Voer de functie uit en open daarna het <strong>Uitvoeringslogboek</strong>.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">4</span>
                    <span>Deel de <strong>leerling-link</strong> (eindigt op /viewform) met je klas.</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><SafeIcon icon={FiSend} className="text-xl" /></div>
                <h2 className="text-2xl font-bold text-gray-900">Stap 1 – Verzamel antwoorden</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <button onClick={()=> setIsScriptExpanded(!isScriptExpanded)} className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors text-left" >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0"> <SafeIcon icon={FiShare2} /> </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Optie A: Automatisch een Google Form genereren</h3>
                        <p className="text-sm text-gray-500">De makkelijkste manier om data van je klas te verzamelen.</p>
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
                                <h5 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-4 font-sans">Instructies</h5>
                                <ol className="space-y-4 text-sm text-gray-700">
                                  <li className="flex gap-3">
                                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">1</span>
                                    <div>Ga naar <a href="https://script.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">script.google.com</a> en klik op <strong>Nieuw project</strong>.</div>
                                  </li>
                                  <li className="flex gap-3">
                                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">2</span>
                                    <div>Verwijder de standaardcode en plak de code hiernaast in het venster.</div>
                                  </li>
                                  <li className="flex gap-3">
                                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">3</span>
                                    <div>Klik op <strong>Uitvoeren</strong> en bekijk het <strong>Uitvoeringslogboek</strong> voor de links.</div>
                                  </li>
                                </ol>

                                <div className="mt-10 pt-8 border-t border-gray-100">
                                  <h5 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-4">ANTWOORDEN OPSLAAN IN GOOGLE SHEET</h5>
                                  
                                  <img 
                                    src={`${import.meta.env.BASE_URL}googlesheet.png`} 
                                    alt="Uitleg Google Sheet opslaan" 
                                    className="w-full h-auto rounded-xl my-4 border border-gray-200 shadow-sm"
                                    onError={(e) => {
                                      e.target.onerror = null; 
                                      e.target.style.display = 'none';
                                    }}
                                  />

                                  <div className="bg-green-50/50 rounded-xl p-5 border border-green-100">
                                    <h6 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                      <SafeIcon icon={FiDatabase} className="text-green-600" />
                                      Stappenplan Google Sheet
                                    </h6>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                      <li>1. Open het formulier via de docent-link.</li>
                                      <li>2. Klik op <strong>Antwoorden</strong>.</li>
                                      <li>3. Klik op het <strong>groene spreadsheet-icoon</strong>.</li>
                                      <li>4. Kies <strong>Nieuwe spreadsheet maken</strong>.</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="relative group">
                                <button onClick={copyScript} className={`absolute top-3 right-3 z-10 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${scriptCopied ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>
                                  <SafeIcon icon={scriptCopied ? FiCheck : FiCopy} /> {scriptCopied ? 'Gekopieerd!' : 'Kopiere Script'}
                                </button>
                                <div className="bg-gray-900 rounded-xl p-4 pt-12 h-full max-h-[500px] overflow-y-auto shadow-inner border border-gray-800">
                                  <pre className="text-[10px] font-mono text-blue-300 leading-relaxed font-normal">{googleScript}</pre>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><SafeIcon icon={FiGrid} className="text-xl" /></div>
                <h2 className="text-2xl font-bold text-gray-900">Stap 3 – Visualiseer</h2>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex space-x-2 p-1 bg-gray-100 rounded-lg">
                    <button onClick={()=> setActiveTab('sheet')} className={`px-4 py-2 rounded-md font-medium transition-colors text-sm ${activeTab==='sheet' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600'}`}>
                      Google Sheet Link
                    </button>
                    <button onClick={()=> setActiveTab('paste')} className={`px-4 py-2 rounded-md font-medium transition-colors text-sm ${activeTab==='paste' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600'}`}>
                      Plakken
                    </button>
                  </div>
                  <button onClick={handleLoadExample} className="ml-auto text-sm font-bold text-purple-600">Test met voorbeelddata</button>
                </div>

                {activeTab==='sheet' ? (
                  <input type="text" className="w-full px-4 py-4 border border-gray-300 rounded-xl bg-gray-50 text-sm" placeholder="Plak Google Sheet link..." value={sheetLink} onChange={(e)=> setSheetLink(e.target.value)} />
                ) : (
                  <textarea className="w-full h-48 p-4 border border-gray-300 rounded-xl bg-gray-50 text-sm font-mono" placeholder="Plak CSV data..." value={inputText} onChange={(e)=> setInputText(e.target.value)} />
                )}

                <button onClick={handleGenerateClick} disabled={isLoading} className="w-full mt-6 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                  {isLoading ? <SafeIcon icon={FiLoader} className="animate-spin" /> : <SafeIcon icon={FiActivity} />}
                  <span>Verwerken</span>
                </button>

                {headers.length > 0 && isStep2Expanded && (
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <h4 className="font-bold mb-6">Koppel de kolommen</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[ 
                        {id: 'name',label: 'Naam Leerling',req: true},
                        {id: 'socialPos',label: 'Gezellig (Social +)'},
                        {id: 'socialNeg',label: 'Niet Gezellig (Social -)'},
                        {id: 'workPos',label: 'Samenwerken (Work +)'},
                        {id: 'workNeg',label: 'Niet Samenwerken (Work -)'} 
                      ].map(field=> (
                        <div key={field.id}>
                          <label className="text-xs font-bold text-gray-500 uppercase">{field.label}</label>
                          <select className="w-full mt-1 p-2 border rounded-lg bg-white" value={mapping[field.id]} onChange={(e)=> setMapping(prev=> ({...prev,[field.id]: e.target.value}))}>
                            <option value="">-- Kies kolom --</option>
                            {headers.map(h=> <option key={h} value={h}>{h}</option>)}
                          </select>
                        </div>
                      ))}
                    </div>
                    <button onClick={generateGraph} disabled={!isFormValid} className="w-full mt-8 py-4 bg-blue-600 text-white rounded-xl font-bold">Genereer Sociogram</button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="lg:col-span-8 bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[700px]">
              <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                <div className="flex gap-2">
                  {['all','socialPos','socialNeg','workPos','workNeg'].map(mode=> (
                    <button key={mode} onClick={()=> setViewMode(mode)} className={`px-4 py-2 text-xs rounded-lg font-bold ${viewMode===mode ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border'}`}>
                      {mode==='all' ? 'Alles' : mode}
                    </button>
                  ))}
                </div>
                <button onClick={()=> setIsGenerated(false)} className="text-xs font-bold text-blue-600">Andere Data</button>
              </div>
              <div className="flex-grow bg-slate-50 relative">
                <ForceGraph2D 
                  ref={graphRef} 
                  graphData={graphData} 
                  nodeLabel="name" 
                  nodeColor={node=> selectedNode?.id===node.id ? '#1e293b' : (highlightNodes.has(node.id) ? '#2563eb' : '#94a3b8')} 
                  linkColor={getLinkColor} 
                  linkWidth={link=> (highlightLinks.has(link) ? 3 : 1)} 
                  onNodeClick={node=> setSelectedNode(node)}
                  nodeCanvasObject={(node,ctx,globalScale)=> {
                    const label=node.name;
                    const fontSize=12 / globalScale;
                    ctx.font=`${fontSize}px Inter`;
                    ctx.beginPath();
                    ctx.arc(node.x,node.y,5,0,2*Math.PI);
                    ctx.fillStyle=selectedNode?.id===node.id ? '#1e293b' : (highlightNodes.has(node.id) ? '#2563eb' : '#94a3b8');
                    ctx.fill();
                    ctx.textAlign='center';
                    ctx.textBaseline='middle';
                    ctx.fillStyle='black';
                    ctx.fillText(label,node.x,node.y+10);
                  }}
                />
              </div>
            </motion.div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-3xl shadow-xl border">
                <h3 className="font-bold text-lg mb-4">Details Leerling</h3>
                {selectedNode ? (
                  <div className="space-y-4">
                    <div className="text-2xl font-black">{selectedNode.name}</div>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="bg-green-50 p-3 rounded-xl border border-green-100">
                        <div className="text-[10px] text-green-600 font-bold uppercase">Sociaal +</div>
                        <div className="text-xl font-bold">{graphData.links.filter(l=> (l.target.id || l.target)===selectedNode.id && l.type==='socialPos').length}x</div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                        <div className="text-[10px] text-blue-600 font-bold uppercase">Werk +</div>
                        <div className="text-xl font-bold">{graphData.links.filter(l=> (l.target.id || l.target)===selectedNode.id && l.type==='workPos').length}x</div>
                      </div>
                    </div>
                    <button onClick={()=> setSelectedNode(null)} className="w-full text-sm text-gray-400">Deselecteer</button>
                  </div>
                ) : (
                  <div className="py-10 text-center text-gray-400 italic text-sm">Klik op een leerling.</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sociogram;