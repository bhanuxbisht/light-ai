// Visual Debugger - Algorithm Visualization Engine
class AlgorithmVisualizer {
  constructor() {
    this.canvas = document.getElementById('viz-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.steps = [];
    this.currentStep = 0;
    this.isPlaying = false;
    this.speed = 1000;
    this.playInterval = null;
    
    this.setupCanvas();
    this.attachEventListeners();
    
    // Animation state
    this.animationFrame = null;
  }

  setupCanvas() {
    const resize = () => {
      const rect = this.canvas.getBoundingClientRect();
      this.canvas.width = rect.width * window.devicePixelRatio;
      this.canvas.height = rect.height * window.devicePixelRatio;
      this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      this.canvas.style.width = rect.width + 'px';
      this.canvas.style.height = rect.height + 'px';
      this.render();
    };
    resize();
    window.addEventListener('resize', resize);
  }

  attachEventListeners() {
    document.getElementById('algo-select').addEventListener('change', () => this.reset());
    document.getElementById('visualize-btn').addEventListener('click', () => this.visualize());
    document.getElementById('reset-btn').addEventListener('click', () => this.reset());
    document.getElementById('prev-btn').addEventListener('click', () => this.prevStep());
    document.getElementById('play-btn').addEventListener('click', () => this.togglePlay());
    document.getElementById('next-btn').addEventListener('click', () => this.nextStep());
    document.getElementById('end-btn').addEventListener('click', () => this.goToEnd());
    document.getElementById('speed-slider').addEventListener('input', (e) => {
      this.speed = parseInt(e.target.value);
      document.getElementById('speed-value').textContent = this.speed + 'ms';
    });
  }

  visualize() {
    const algo = document.getElementById('algo-select').value;
    const arrayInput = document.getElementById('array-input').value.trim();
    
    if (!arrayInput) {
      alert('Please enter array values');
      return;
    }

    const arr = arrayInput.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x));
    
    if (arr.length === 0) {
      alert('Please enter valid numbers separated by commas');
      return;
    }

    this.reset();
    
    switch(algo) {
      case 'twosum':
        this.generateTwoSumSteps(arr);
        break;
      case 'bubblesort':
        this.generateBubbleSortSteps(arr);
        break;
      case 'binarysearch':
        this.generateBinarySearchSteps(arr);
        break;
      case 'reverse':
        this.generateReverseArraySteps(arr);
        break;
      default:
        alert('Algorithm not implemented');
    }
    
    if (this.steps.length > 0) {
      this.render();
      this.updateControls();
    }
  }

  // Two Sum Visualization
  generateTwoSumSteps(nums) {
    const target = parseInt(document.getElementById('target-input').value) || 0;
    const steps = [];
    const map = new Map();
    
    steps.push({
      array: [...nums],
      explanation: `Looking for two numbers that sum to ${target}`,
      variables: { target, map: '{}' },
      code: 0,
      highlights: []
    });

    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
      
      steps.push({
        array: [...nums],
        explanation: `Checking index ${i} (value: ${nums[i]}). Complement: ${complement}`,
        variables: { i, current: nums[i], complement, map: JSON.stringify([...map]) },
        code: 1,
        highlights: [i],
        checking: i
      });

      if (map.has(complement)) {
        const j = map.get(complement);
        steps.push({
          array: [...nums],
          explanation: `✅ Found! nums[${j}] + nums[${i}] = ${nums[j]} + ${nums[i]} = ${target}`,
          variables: { result: [j, i] },
          code: 2,
          highlights: [j, i],
          found: [j, i],
          success: true
        });
        break;
      }

      map.set(nums[i], i);
      steps.push({
        array: [...nums],
        explanation: `Add ${nums[i]} → index ${i} to map`,
        variables: { map: JSON.stringify([...map]) },
        code: 3,
        highlights: [i],
        added: i
      });
    }

    if (!steps.some(s => s.success)) {
      steps.push({
        array: [...nums],
        explanation: '❌ No solution found',
        variables: { result: 'null' },
        code: 4,
        highlights: []
      });
    }

    this.steps = steps;
  }

  // Bubble Sort Visualization
  generateBubbleSortSteps(arr) {
    const steps = [];
    const nums = [...arr];
    
    steps.push({
      array: [...nums],
      explanation: 'Starting Bubble Sort - Compare adjacent elements',
      variables: { n: nums.length },
      code: 0,
      highlights: []
    });

    for (let i = 0; i < nums.length - 1; i++) {
      for (let j = 0; j < nums.length - i - 1; j++) {
        steps.push({
          array: [...nums],
          explanation: `Comparing ${nums[j]} and ${nums[j+1]}`,
          variables: { i, j, comparing: [nums[j], nums[j+1]] },
          code: 1,
          highlights: [j, j+1],
          comparing: [j, j+1]
        });

        if (nums[j] > nums[j+1]) {
          [nums[j], nums[j+1]] = [nums[j+1], nums[j]];
          steps.push({
            array: [...nums],
            explanation: `Swapped! ${nums[j+1]} > ${nums[j]}`,
            variables: { i, j, swapped: true },
            code: 2,
            highlights: [j, j+1],
            swapped: [j, j+1]
          });
        }
      }
      
      steps.push({
        array: [...nums],
        explanation: `Pass ${i+1} complete. ${nums[nums.length-i-1]} is in position`,
        variables: { i: i+1 },
        code: 3,
        highlights: [nums.length-i-1],
        sorted: nums.length-i-1
      });
    }

    steps.push({
      array: [...nums],
      explanation: '✅ Sorting Complete!',
      variables: { result: nums },
      code: 4,
      highlights: [],
      success: true
    });

    this.steps = steps;
  }

  // Binary Search Visualization
  generateBinarySearchSteps(arr) {
    const nums = [...arr].sort((a,b) => a - b);
    const target = parseInt(document.getElementById('target-input').value) || nums[0];
    const steps = [];
    
    steps.push({
      array: [...nums],
      explanation: `Searching for ${target} using Binary Search`,
      variables: { target, left: 0, right: nums.length - 1 },
      code: 0,
      highlights: []
    });

    let left = 0, right = nums.length - 1;
    let found = false;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      steps.push({
        array: [...nums],
        explanation: `Check middle: index ${mid} (value: ${nums[mid]})`,
        variables: { left, right, mid, value: nums[mid] },
        code: 1,
        highlights: [mid],
        checking: mid,
        range: [left, right]
      });

      if (nums[mid] === target) {
        steps.push({
          array: [...nums],
          explanation: `✅ Found ${target} at index ${mid}!`,
          variables: { result: mid },
          code: 2,
          highlights: [mid],
          found: mid,
          success: true
        });
        found = true;
        break;
      } else if (nums[mid] < target) {
        steps.push({
          array: [...nums],
          explanation: `${nums[mid]} < ${target}, search right half`,
          variables: { left: mid + 1, right },
          code: 3,
          highlights: [mid],
          range: [mid + 1, right]
        });
        left = mid + 1;
      } else {
        steps.push({
          array: [...nums],
          explanation: `${nums[mid]} > ${target}, search left half`,
          variables: { left, right: mid - 1 },
          code: 4,
          highlights: [mid],
          range: [left, mid - 1]
        });
        right = mid - 1;
      }
    }

    if (!found) {
      steps.push({
        array: [...nums],
        explanation: `❌ ${target} not found`,
        variables: { result: -1 },
        code: 5,
        highlights: []
      });
    }

    this.steps = steps;
  }

  // Reverse Array Visualization
  generateReverseArraySteps(arr) {
    const steps = [];
    const nums = [...arr];
    
    steps.push({
      array: [...nums],
      explanation: 'Reversing array using two pointers',
      variables: { left: 0, right: nums.length - 1 },
      code: 0,
      highlights: []
    });

    let left = 0, right = nums.length - 1;

    while (left < right) {
      steps.push({
        array: [...nums],
        explanation: `Swap elements at index ${left} and ${right}`,
        variables: { left, right, values: [nums[left], nums[right]] },
        code: 1,
        highlights: [left, right],
        comparing: [left, right]
      });

      [nums[left], nums[right]] = [nums[right], nums[left]];
      
      steps.push({
        array: [...nums],
        explanation: `Swapped ${nums[right]} ↔ ${nums[left]}`,
        variables: { left, right },
        code: 2,
        highlights: [left, right],
        swapped: [left, right]
      });

      left++;
      right--;
    }

    steps.push({
      array: [...nums],
      explanation: '✅ Array Reversed!',
      variables: { result: nums },
      code: 3,
      highlights: [],
      success: true
    });

    this.steps = steps;
  }

  render() {
    if (this.steps.length === 0) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = '#8d8d93';
      this.ctx.font = '16px Inter';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Select algorithm and click Visualize', this.canvas.width / (2 * window.devicePixelRatio), this.canvas.height / (2 * window.devicePixelRatio));
      return;
    }

    const step = this.steps[this.currentStep];
    this.drawArray(step);
    this.updateVariables(step.variables);
    this.updateExplanation(step.explanation);
    this.updateStepCounter();
    this.highlightCode(step.code);
  }

  drawArray(step) {
    const w = this.canvas.width / window.devicePixelRatio;
    const h = this.canvas.height / window.devicePixelRatio;
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    const arr = step.array;
    const maxVal = Math.max(...arr, 1);
    const barWidth = Math.min(80, (w - 40) / arr.length - 10);
    const barMaxHeight = h - 120;
    const startX = (w - (barWidth + 10) * arr.length) / 2;

    arr.forEach((val, idx) => {
      const barHeight = (val / maxVal) * barMaxHeight;
      const x = startX + idx * (barWidth + 10);
      const y = h - 80 - barHeight;

      // Determine color
      let color = 'rgba(255,255,255,0.1)';
      
      if (step.highlights && step.highlights.includes(idx)) {
        if (step.found && step.found.includes(idx)) {
          color = '#30D158'; // Success green
        } else if (step.swapped && step.swapped.includes(idx)) {
          color = '#FFD60A'; // Warning yellow
        } else if (step.comparing && step.comparing.includes(idx)) {
          color = '#FF453A'; // Error red
        } else if (step.checking === idx) {
          color = '#0071E3'; // Accent blue
        } else if (step.added === idx) {
          color = '#00D4FF'; // Cyan
        } else {
          color = '#0071E3';
        }
      }

      // Draw bar
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x, y, barWidth, barHeight);
      
      // Draw border
      this.ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(x, y, barWidth, barHeight);

      // Draw value inside bar
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '14px Inter';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(val, x + barWidth / 2, y + barHeight / 2 + 5);

      // Draw index below
      this.ctx.fillStyle = '#8d8d93';
      this.ctx.font = '12px Inter';
      this.ctx.fillText(idx, x + barWidth / 2, h - 50);
    });

    // Draw range indicator for binary search
    if (step.range) {
      const [left, right] = step.range;
      const leftX = startX + left * (barWidth + 10);
      const rightX = startX + right * (barWidth + 10) + barWidth;
      
      this.ctx.strokeStyle = '#FFD60A';
      this.ctx.lineWidth = 3;
      this.ctx.setLineDash([5, 5]);
      this.ctx.strokeRect(leftX - 5, h - 90 - barMaxHeight, rightX - leftX + 10, barMaxHeight + 10);
      this.ctx.setLineDash([]);
    }
  }

  updateVariables(vars) {
    const list = document.getElementById('variables-list');
    list.innerHTML = '';
    
    for (const [key, value] of Object.entries(vars)) {
      const item = document.createElement('div');
      item.className = 'var-item';
      item.innerHTML = `
        <span class="var-name">${key}</span>
        <span class="var-value">${typeof value === 'object' ? JSON.stringify(value) : value}</span>
      `;
      list.appendChild(item);
    }
  }

  updateExplanation(text) {
    document.querySelector('.explanation-box p').textContent = text;
  }

  updateStepCounter() {
    document.getElementById('current-step').textContent = this.currentStep + 1;
    document.getElementById('total-steps').textContent = this.steps.length;
  }

  highlightCode(lineIndex) {
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach((line, idx) => {
      line.classList.toggle('active', idx === lineIndex);
    });
  }

  updateControls() {
    const hasPrev = this.currentStep > 0;
    const hasNext = this.currentStep < this.steps.length - 1;
    
    document.getElementById('prev-btn').disabled = !hasPrev;
    document.getElementById('next-btn').disabled = !hasNext;
    document.getElementById('end-btn').disabled = !hasNext;
    document.getElementById('play-btn').disabled = this.steps.length === 0;
    
    const playBtn = document.getElementById('play-btn');
    playBtn.textContent = this.isPlaying ? '⏸ Pause' : '▶ Play';
  }

  reset() {
    this.stop();
    this.steps = [];
    this.currentStep = 0;
    this.render();
    this.updateControls();
    document.getElementById('variables-list').innerHTML = '';
    document.querySelector('.explanation-box p').textContent = 'Click "Visualize" to start';
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.render();
      this.updateControls();
    }
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.render();
      this.updateControls();
    }
  }

  goToEnd() {
    this.currentStep = this.steps.length - 1;
    this.render();
    this.updateControls();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
  }

  play() {
    if (this.steps.length === 0) return;
    
    this.isPlaying = true;
    this.updateControls();
    
    this.playInterval = setInterval(() => {
      if (this.currentStep < this.steps.length - 1) {
        this.nextStep();
      } else {
        this.stop();
      }
    }, this.speed);
  }

  stop() {
    this.isPlaying = false;
    if (this.playInterval) {
      clearInterval(this.playInterval);
      this.playInterval = null;
    }
    this.updateControls();
  }
}

// Algorithm code templates
const algorithmCode = {
  twosum: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
  bubblesort: `function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
      }
    }
  }
  return arr;
}`,
  binarysearch: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
  reverse: `function reverseArray(arr) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = 
      [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr;
}`
};

// Initialize
const visualizer = new AlgorithmVisualizer();

// Update code display on algorithm change
document.getElementById('algo-select').addEventListener('change', (e) => {
  const code = algorithmCode[e.target.value] || '';
  const codeDisplay = document.getElementById('code-display');
  codeDisplay.innerHTML = '';
  
  code.split('\n').forEach(line => {
    const span = document.createElement('span');
    span.className = 'code-line';
    span.textContent = line;
    codeDisplay.appendChild(span);
  });
  
  // Show/hide target input based on algorithm
  const targetSection = document.getElementById('target-label').parentElement;
  if (e.target.value === 'twosum' || e.target.value === 'binarysearch') {
    targetSection.style.display = 'flex';
  } else {
    targetSection.style.display = 'none';
  }
});

// Initialize with default algorithm
document.getElementById('algo-select').dispatchEvent(new Event('change'));
