import React, { useState, useEffect } from 'react';
import { Play, Cpu, Layers, Server, Code, Zap, RefreshCw, CheckCircle2, AlertCircle, Database } from 'lucide-react';
import { runBlockingDemo, runClosureDemo, getModulesInfo, getServerArchitecture } from '../services/api';

const TopicLab = () => {
  const [activeTab, setActiveTab] = useState('blocking');
  
  // Blocking vs Non-Blocking State
  const [blockingLoading, setBlockingLoading] = useState(false);
  const [blockingResult, setBlockingResult] = useState(null);

  // Closure State
  const [closureLoading, setClosureLoading] = useState(false);
  const [closureResult, setClosureResult] = useState(null);

  // Modules & Server Info State
  const [modulesInfo, setModulesInfo] = useState(null);
  const [serverArch, setServerArch] = useState(null);

  useEffect(() => {
    getModulesInfo().then(setModulesInfo).catch(console.error);
    getServerArchitecture().then(setServerArch).catch(console.error);
  }, []);

  const handleTestBlocking = async (mode) => {
    setBlockingLoading(true);
    setBlockingResult(null);
    try {
      const data = await runBlockingDemo(mode);
      setBlockingResult(data);
    } catch (err) {
      setBlockingResult({ success: false, message: err.message });
    } finally {
      setBlockingLoading(false);
    }
  };

  const handleTestClosure = async () => {
    setClosureLoading(true);
    try {
      const data = await runClosureDemo();
      setClosureResult(data);
    } catch (err) {
      setClosureResult({ success: false, message: err.message });
    } finally {
      setClosureLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-gray-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="text-amber-500 fill-amber-500" size={20} />
            <h2 className="text-xl font-bold text-gray-900">Node.js & Express.js Interactive Topic Lab</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Test Event Loop blocking, Closures, Express Routing, ES Modules, and MongoDB BSON document handling live.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 bg-gray-100 p-1.5 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('blocking')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'blocking' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            ⚡ Blocking vs Non-Blocking
          </button>
          <button
            onClick={() => setActiveTab('closures')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'closures' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🔒 Closures
          </button>
          <button
            onClick={() => setActiveTab('modules')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'modules' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📦 Modules (CJS vs ESM)
          </button>
          <button
            onClick={() => setActiveTab('server')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'server' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🌐 Server & Routing
          </button>
        </div>
      </div>

      {/* Tab 1: Blocking vs Non-Blocking */}
      {activeTab === 'blocking' && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-50/60 p-5 rounded-2xl border border-purple-100">
              <h3 className="font-bold text-gray-800 text-sm mb-2 flex items-center gap-2">
                <Cpu size={18} className="text-purple-600" /> Non-Blocking Execution (Async)
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Node.js uses non-blocking I/O driven by libuv event loop. Asynchronous operations allow the single thread to handle concurrent HTTP requests smoothly.
              </p>
              <button
                onClick={() => handleTestBlocking('non-blocking')}
                disabled={blockingLoading}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl text-xs font-bold shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                {blockingLoading ? <RefreshCw className="animate-spin" size={14} /> : <Play size={14} />}
                Run Async Non-Blocking Test
              </button>
            </div>

            <div className="bg-red-50/60 p-5 rounded-2xl border border-red-100">
              <h3 className="font-bold text-gray-800 text-sm mb-2 flex items-center gap-2">
                <AlertCircle size={18} className="text-red-500" /> Blocking Execution (Sync CPU Loop)
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Synchronous CPU computations (e.g. 50M loop) freeze the Node.js Event Loop single thread, preventing any incoming HTTP requests from processing until complete.
              </p>
              <button
                onClick={() => handleTestBlocking('blocking')}
                disabled={blockingLoading}
                className="w-full py-2.5 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl text-xs font-bold shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                {blockingLoading ? <RefreshCw className="animate-spin" size={14} /> : <Play size={14} />}
                Run Sync CPU Blocking Test
              </button>
            </div>
          </div>

          {/* Test Results */}
          {blockingResult && (
            <div className="mt-4 bg-slate-950 p-4 rounded-2xl text-xs font-mono text-emerald-400 border border-slate-800">
              <div className="flex justify-between items-center mb-2 border-b border-slate-800 pb-2">
                <span className="text-white font-bold uppercase">{blockingResult.mode}</span>
                <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded text-[10px]">
                  Execution Duration: {blockingResult.executionTimeMs} ms
                </span>
              </div>
              <p className="text-slate-300 mb-2">{blockingResult.message}</p>
              <p className="text-amber-300 italic text-[11px]">{blockingResult.explanation}</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Closures */}
      {activeTab === 'closures' && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-purple-50/60 p-5 rounded-2xl border border-purple-100">
            <h3 className="font-bold text-gray-800 text-sm mb-2 flex items-center gap-2">
              <Layers size={18} className="text-purple-600" /> Stateful Closures in Express Middleware
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              A Closure in JavaScript is a function that remembers its outer lexical environment variables even after the parent function has completed execution. Our Express backend uses closures for rate-limiting per IP and timing request execution!
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleTestClosure}
                disabled={closureLoading}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-xs font-bold shadow-md hover:opacity-90 transition-all flex items-center gap-2"
              >
                {closureLoading ? <RefreshCw className="animate-spin" size={14} /> : <Play size={14} />}
                Invoke Closure State Counter Endpoint
              </button>

              {closureResult && (
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-purple-200 shadow-sm">
                  <span className="text-xs text-gray-500 font-bold">Enclosed Counter State:</span>
                  <span className="text-lg font-black text-purple-700">{closureResult.retainedCounterValue}</span>
                </div>
              )}
            </div>
          </div>

          {closureResult && (
            <div className="bg-slate-950 p-4 rounded-2xl text-xs font-mono text-emerald-400 border border-slate-800">
              <p className="text-slate-300 mb-2">{closureResult.explanation}</p>
              <pre className="text-purple-300 bg-slate-900 p-3 rounded-xl overflow-x-auto">
{closureResult.codeSnippet}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Modules */}
      {activeTab === 'modules' && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-100 flex items-center gap-3">
            <CheckCircle2 size={20} className="text-green-600" />
            <div>
              <h3 className="font-bold text-gray-900 text-sm">Active Server Module Standard</h3>
              <p className="text-xs text-purple-700 font-mono">
                {modulesInfo?.activeModuleSystemInThisServer || 'ES Modules (ESM) with "type": "module"'}
              </p>
            </div>
          </div>

          {modulesInfo?.comparison && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200">
                    <th className="p-3 rounded-l-xl">Feature</th>
                    <th className="p-3">CommonJS (CJS)</th>
                    <th className="p-3 rounded-r-xl">ES Modules (ESM)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {modulesInfo.comparison.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/80">
                      <td className="p-3 font-bold text-gray-800">{item.feature}</td>
                      <td className="p-3 font-mono text-amber-700 bg-amber-50/40 rounded-lg">{item.commonJS}</td>
                      <td className="p-3 font-mono text-emerald-700 bg-emerald-50/40 rounded-lg">{item.esModules}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Server & Routing */}
      {activeTab === 'server' && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-5 rounded-2xl text-xs font-mono text-slate-200 border border-slate-800">
              <h3 className="font-bold text-amber-400 text-sm mb-3 flex items-center gap-2">
                <Server size={16} /> Express Routing Pipeline
              </h3>
              <ul className="space-y-2 text-slate-300">
                {serverArch?.architecture?.expressRoutingPipeline.map((step, i) => (
                  <li key={i} className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl text-xs font-mono text-slate-200 border border-slate-800">
              <h3 className="font-bold text-emerald-400 text-sm mb-3 flex items-center gap-2">
                <Code size={16} /> Event Loop Phases
              </h3>
              <ul className="space-y-2 text-emerald-300">
                {serverArch?.architecture?.eventLoopStages.map((stage, i) => (
                  <li key={i} className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                    {stage}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicLab;
