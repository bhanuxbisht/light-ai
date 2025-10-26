// Light AI - Problem Solver Interface
// Copyright © 2025 Bhanu Bisht. All rights reserved.

(function() {
  'use strict';

  // State
  let currentProblem = null;
  let currentLanguage = 'javascript';
  let hintIndex = 0;
  let editor = null;

  // DOM Elements
  const elements = {
    title: document.getElementById('problem-title'),
    meta: document.getElementById('problem-meta'),
    description: document.getElementById('problem-description'),
    examples: document.getElementById('problem-examples'),
    constraints: document.getElementById('problem-constraints'),
    testCount: document.getElementById('test-count'),
    testResults: document.getElementById('test-results'),
    hintArea: document.getElementById('hint-area'),
    outputArea: document.getElementById('output-area'),
    statusEl: document.getElementById('status'),
    languageSelect: document.getElementById('language'),
    textarea: document.getElementById('textarea-editor'),
    monacoContainer: document.getElementById('monaco-container'),
    runBtn: document.getElementById('run-btn'),
    submitBtn: document.getElementById('submit-btn'),
    getHintBtn: document.getElementById('get-hint'),
    showSolutionBtn: document.getElementById('show-solution'),
    resetCodeBtn: document.getElementById('reset-code'),
    clearOutputBtn: document.getElementById('clear-output'),
    prevProblemBtn: document.getElementById('prev-problem'),
    nextProblemBtn: document.getElementById('next-problem'),
    successModal: document.getElementById('success-modal'),
    successStats: document.getElementById('success-stats'),
    viewSolutionBtn: document.getElementById('view-solution-btn'),
    nextProblemModalBtn: document.getElementById('next-problem-btn')
  };

  // Initialize
  function init() {
    loadProblemFromURL();
    setupEventListeners();
    tryInitMonaco();
    console.log('%c⚡ Light AI Solver', 'font-size: 20px; font-weight: 600; color: #0071E3');
  }

  // Load problem from URL parameter or default to first
  function loadProblemFromURL() {
    const params = new URLSearchParams(window.location.search);
    const problemId = parseInt(params.get('id')) || 1;
    loadProblem(problemId);
  }

  // Load and display problem
  function loadProblem(problemId) {
    const problem = PROBLEMS.find(p => p.id === problemId);
    if (!problem) {
      elements.title.textContent = 'Problem not found';
      return;
    }

    currentProblem = problem;
    hintIndex = 0;

    // Update UI
    elements.title.textContent = `${problem.id}. ${problem.title}`;
    elements.meta.textContent = `${problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)} • ${problem.category} • ${problem.companies.join(', ')}`;
    
    // Description (support markdown-like formatting)
    elements.description.innerHTML = problem.description
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\n\n/g, '<br><br>');

    // Examples
    elements.examples.innerHTML = problem.examples.map((ex, i) => `
      <div class="example">
        <strong>Example ${i + 1}:</strong><br>
        <strong>Input:</strong> ${ex.input}<br>
        <strong>Output:</strong> ${ex.output}
        ${ex.explanation ? `<br><strong>Explanation:</strong> ${ex.explanation}` : ''}
      </div>
    `).join('');

    // Constraints
    elements.constraints.innerHTML = problem.constraints.map(c => `<li>${c}</li>`).join('');

    // Test cases
    elements.testCount.textContent = problem.testCases.length;
    elements.testResults.innerHTML = '';
    
    // Reset hints
    elements.hintArea.textContent = 'Click "Get Hint" for progressive hints';

    // Load starter code
    loadStarterCode();

    // Update navigation buttons
    elements.prevProblemBtn.disabled = problemId <= 1;
    elements.nextProblemBtn.disabled = problemId >= PROBLEMS.length;

    // Update URL
    const newURL = `${window.location.pathname}?id=${problemId}`;
    window.history.pushState({ problemId }, '', newURL);
  }

  // Load starter code for current language
  function loadStarterCode() {
    if (!currentProblem) return;
    const code = currentProblem.starterCode[currentLanguage] || '// No starter code available';
    
    if (editor && window.monacoLoaded) {
      editor.setValue(code);
      const langMap = { javascript: 'javascript', python: 'python', java: 'java', cpp: 'cpp' };
      monaco.editor.setModelLanguage(editor.getModel(), langMap[currentLanguage] || 'plaintext');
    } else {
      elements.textarea.value = code;
    }
  }

  // Get current code from editor
  function getCode() {
    if (editor && window.monacoLoaded) {
      return editor.getValue();
    }
    return elements.textarea.value;
  }

  // Set code in editor
  function setCode(code) {
    if (editor && window.monacoLoaded) {
      editor.setValue(code);
    } else {
      elements.textarea.value = code;
    }
  }

  // Setup event listeners
  function setupEventListeners() {
    elements.runBtn.addEventListener('click', runCode);
    elements.submitBtn.addEventListener('click', submitSolution);
    elements.getHintBtn.addEventListener('click', showNextHint);
    elements.showSolutionBtn.addEventListener('click', showSolution);
    elements.resetCodeBtn.addEventListener('click', () => loadStarterCode());
    elements.clearOutputBtn.addEventListener('click', () => {
      elements.outputArea.textContent = '// Output cleared';
    });
    
    elements.languageSelect.addEventListener('change', (e) => {
      currentLanguage = e.target.value;
      loadStarterCode();
    });

    elements.prevProblemBtn.addEventListener('click', () => {
      if (currentProblem && currentProblem.id > 1) {
        loadProblem(currentProblem.id - 1);
      }
    });

    elements.nextProblemBtn.addEventListener('click', () => {
      if (currentProblem && currentProblem.id < PROBLEMS.length) {
        loadProblem(currentProblem.id + 1);
      }
    });

    elements.viewSolutionBtn.addEventListener('click', () => {
      hideModal();
      showSolution();
    });

    elements.nextProblemModalBtn.addEventListener('click', () => {
      hideModal();
      if (currentProblem && currentProblem.id < PROBLEMS.length) {
        loadProblem(currentProblem.id + 1);
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCode();
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        submitSolution();
      }
    });
  }

  // Run code (first test case only)
  async function runCode() {
    if (!currentProblem) return;
    
    elements.statusEl.textContent = 'Running...';
    elements.outputArea.textContent = '// Executing code...\n';
    
    const code = getCode();
    const testCase = currentProblem.testCases[0];

    try {
      const result = await executeCode(code, [testCase]);
      displayRunResult(result[0]);
    } catch (error) {
      elements.outputArea.textContent = `❌ Error: ${error.message}`;
      elements.statusEl.textContent = 'Error';
    }
  }

  // Submit solution (run all test cases)
  async function submitSolution() {
    if (!currentProblem) return;
    
    elements.statusEl.textContent = 'Running all tests...';
    elements.outputArea.textContent = '// Running all test cases...\n';
    elements.testResults.innerHTML = '';
    
    const code = getCode();
    
    try {
      const results = await executeCode(code, currentProblem.testCases);
      displayAllResults(results);
      
      // Check if all passed
      const allPassed = results.every(r => r.passed);
      if (allPassed) {
        showSuccessModal(results);
      }
    } catch (error) {
      elements.outputArea.textContent = `❌ Error: ${error.message}`;
      elements.statusEl.textContent = 'Error';
    }
  }

  // Execute code based on language
  async function executeCode(code, testCases) {
    if (currentLanguage === 'javascript') {
      return executeJavaScript(code, testCases);
    } else {
      return executeOnServer(code, testCases);
    }
  }

  // Execute JavaScript in Web Worker
  function executeJavaScript(code, testCases) {
    return new Promise((resolve, reject) => {
      const results = [];
      let completed = 0;

      testCases.forEach((testCase, index) => {
        const workerCode = `
          onmessage = function(e) {
            const { code, input } = e.data;
            try {
              const startTime = performance.now();
              
              ${code}
              
              const func = ${getFunctionName()};
              if (typeof func !== 'function') {
                throw new Error('Expected function: ${getFunctionName()}');
              }
              
              const args = getInputArgs(input);
              const result = func(...args);
              const runtime = Math.round(performance.now() - startTime);
              
              postMessage({ success: true, result, runtime });
            } catch (err) {
              postMessage({ success: false, error: err.message || String(err) });
            }
          }
          
          function getInputArgs(input) {
            ${getInputArgsFunction()}
          }
        `;

        const blob = new Blob([workerCode], { type: 'application/javascript' });
        const worker = new Worker(URL.createObjectURL(blob));
        
        const timeout = setTimeout(() => {
          worker.terminate();
          results[index] = {
            passed: false,
            input: testCase.input,
            expected: testCase.expected,
            actual: null,
            runtime: 0,
            error: 'Time limit exceeded (2s)'
          };
          completed++;
          if (completed === testCases.length) resolve(results);
        }, 2000);

        worker.onmessage = (e) => {
          clearTimeout(timeout);
          worker.terminate();
          
          if (e.data.success) {
            const passed = JSON.stringify(e.data.result) === JSON.stringify(testCase.expected);
            results[index] = {
              passed,
              input: testCase.input,
              expected: testCase.expected,
              actual: e.data.result,
              runtime: e.data.runtime,
              error: null
            };
          } else {
            results[index] = {
              passed: false,
              input: testCase.input,
              expected: testCase.expected,
              actual: null,
              runtime: 0,
              error: e.data.error
            };
          }
          
          completed++;
          if (completed === testCases.length) resolve(results);
        };

        worker.onerror = (err) => {
          clearTimeout(timeout);
          worker.terminate();
          results[index] = {
            passed: false,
            input: testCase.input,
            expected: testCase.expected,
            actual: null,
            runtime: 0,
            error: err.message || 'Worker error'
          };
          completed++;
          if (completed === testCases.length) resolve(results);
        };

        worker.postMessage({ code, input: testCase.input });
      });
    });
  }

  // Execute on server for other languages
  async function executeOnServer(code, testCases) {
    const response = await fetch('/api/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: currentLanguage,
        code,
        testCases
      })
    });

    if (!response.ok) {
      throw new Error('Server execution failed');
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'Execution failed');
    }

    return data.results;
  }

  // Helper functions for code execution
  function getFunctionName() {
    if (!currentProblem) return 'solution';
    if (currentProblem.id === 1) return 'twoSum';
    if (currentProblem.id === 2) return 'isValid';
    if (currentProblem.id === 3) return 'mergeTwoLists';
    const title = currentProblem.title.replace(/[^a-zA-Z0-9]/g, '');
    return title.charAt(0).toLowerCase() + title.slice(1);
  }

  function getInputArgsFunction() {
    // Convert input object to function arguments
    if (currentProblem.id === 1) { // Two Sum
      return 'return [input.nums, input.target];';
    } else if (currentProblem.id === 2) { // Valid Parentheses
      return 'return [input.s];';
    } else if (currentProblem.id === 3) { // Merge Two Lists
      return 'return [input.list1, input.list2];';
    }
    return 'return Object.values(input);';
  }

  // Display single run result
  function displayRunResult(result) {
    if (result.passed) {
      elements.outputArea.textContent = `✅ Test Passed!\n\nInput: ${formatInput(result.input)}\nExpected: ${JSON.stringify(result.expected)}\nOutput: ${JSON.stringify(result.actual)}\nRuntime: ${result.runtime}ms`;
      elements.statusEl.textContent = '✅ Passed';
    } else if (result.error) {
      elements.outputArea.textContent = `❌ Runtime Error\n\n${result.error}`;
      elements.statusEl.textContent = '❌ Error';
    } else {
      elements.outputArea.textContent = `❌ Test Failed\n\nInput: ${formatInput(result.input)}\nExpected: ${JSON.stringify(result.expected)}\nYour Output: ${JSON.stringify(result.actual)}\nRuntime: ${result.runtime}ms`;
      elements.statusEl.textContent = '❌ Failed';
    }
  }

  // Display all test results
  function displayAllResults(results) {
    const passed = results.filter(r => r.passed).length;
    const total = results.length;
    
    elements.statusEl.textContent = `${passed}/${total} tests passed`;
    
    elements.testResults.innerHTML = results.map((r, i) => `
      <div class="test-case ${r.passed ? 'passed' : 'failed'}">
        <strong>Test ${i + 1}:</strong> ${r.passed ? '✅ Passed' : '❌ Failed'}
        ${r.error ? `<br><span style="color:#FF453A">Error: ${r.error}</span>` : ''}
        ${!r.passed && !r.error ? `<br>Expected: ${JSON.stringify(r.expected)}<br>Got: ${JSON.stringify(r.actual)}` : ''}
        ${r.runtime ? `<br><span style="color:#8d8d93">Runtime: ${r.runtime}ms</span>` : ''}
      </div>
    `).join('');

    let summary = `${passed}/${total} tests passed\n\n`;
    results.forEach((r, i) => {
      summary += `Test ${i + 1}: ${r.passed ? '✅ PASS' : '❌ FAIL'}\n`;
    });
    elements.outputArea.textContent = summary;
  }

  // Format input for display
  function formatInput(input) {
    return JSON.stringify(input);
  }

  // Show success modal
  function showSuccessModal(results) {
    const avgRuntime = Math.round(results.reduce((sum, r) => sum + r.runtime, 0) / results.length);
    const totalRuntime = results.reduce((sum, r) => sum + r.runtime, 0);
    
    elements.successStats.innerHTML = `
      <div style="font-size:3rem;margin-bottom:16px">🎉</div>
      <p style="font-size:1.2rem;margin:8px 0">All ${results.length} test cases passed!</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px;text-align:left">
        <div>
          <div style="color:#8d8d93;font-size:0.85rem">Average Runtime</div>
          <div style="font-size:1.3rem;font-weight:600;color:#30D158">${avgRuntime}ms</div>
        </div>
        <div>
          <div style="color:#8d8d93;font-size:0.85rem">Total Runtime</div>
          <div style="font-size:1.3rem;font-weight:600;color:#30D158">${totalRuntime}ms</div>
        </div>
      </div>
      <p style="color:#8d8d93;font-size:0.9rem;margin-top:16px">Auto-advancing to next problem in 3 seconds...</p>
    `;
    
    elements.successModal.classList.remove('hidden');

    // Auto-advance after 3 seconds
    setTimeout(() => {
      if (currentProblem && currentProblem.id < PROBLEMS.length) {
        hideModal();
        loadProblem(currentProblem.id + 1);
      }
    }, 3000);
  }

  // Hide modal
  function hideModal() {
    elements.successModal.classList.add('hidden');
  }

  // Show next hint
  function showNextHint() {
    if (!currentProblem || !currentProblem.hints) return;
    
    if (hintIndex >= currentProblem.hints.length) {
      elements.hintArea.textContent = '💡 No more hints available. Try the solution button or keep working!';
      return;
    }
    
    elements.hintArea.textContent = currentProblem.hints[hintIndex];
    hintIndex++;
  }

  // Show solution
  function showSolution() {
    if (!currentProblem || !currentProblem.solution) {
      elements.hintArea.textContent = '❌ Solution not available for this problem yet.';
      return;
    }
    
    const solutionCode = currentProblem.solution[currentLanguage];
    if (solutionCode) {
      setCode(solutionCode);
      elements.hintArea.textContent = '✅ Solution loaded! Study the approach and try to understand it.';
    } else {
      elements.hintArea.textContent = `❌ Solution not available in ${currentLanguage} yet.`;
    }
  }

  // Initialize Monaco Editor
  function tryInitMonaco() {
    if (!window.require) {
      setTimeout(tryInitMonaco, 200);
      return;
    }

    try {
      window.require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@0.44.0/min/vs' } });
      window.require(['vs/editor/editor.main'], function() {
        window.monacoLoaded = true;
        elements.textarea.style.display = 'none';
        elements.monacoContainer.style.display = 'block';
        
        editor = monaco.editor.create(elements.monacoContainer, {
          value: elements.textarea.value,
          language: 'javascript',
          theme: 'vs-dark',
          automaticLayout: true,
          fontSize: 14,
          fontFamily: "'Fira Code', Consolas, Monaco, monospace",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          renderLineHighlight: 'all',
          lineNumbers: 'on',
          folding: true,
          bracketPairColorization: { enabled: true }
        });

        console.log('✅ Monaco Editor loaded');
      });
    } catch (e) {
      console.warn('Monaco load failed, using textarea', e);
    }
  }

  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose API for debugging
  window.__LIGHTAI = {
    loadProblem,
    getCode,
    runCode,
    submitSolution,
    currentProblem: () => currentProblem
  };

})();
