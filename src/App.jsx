import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import "..//src/index.css"

const AlgorithmVisualizer = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [speed, setSpeed] = useState(50);
  const [arraySize, setArraySize] = useState(30);

  // Generate random array
  const generateArray = () => {
    const newArray = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
  };

  useEffect(() => {
    generateArray();
  }, [arraySize]);

  // Sleep function for animation
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, 101 - speed));

  // Bubble Sort Implementation
  const bubbleSort = async () => {
    setSorting(true);
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          // Swap elements
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await sleep(101 - speed);
        }
      }
    }
    setSorting(false);
  };

  // Quick Sort Implementation
  const quickSort = async () => {
    setSorting(true);
    const arr = [...array];

    const partition = async (low, high) => {
      const pivot = arr[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setArray([...arr]);
          await sleep(101 - speed);
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      setArray([...arr]);
      await sleep(101 - speed);
      return i + 1;
    };

    const sort = async (low, high) => {
      if (low < high) {
        const pi = await partition(low, high);
        await sort(low, pi - 1);
        await sort(pi + 1, high);
      }
    };

    await sort(0, arr.length - 1);
    setSorting(false);
  };

  // Start sorting based on selected algorithm
  const startSort = () => {
    if (algorithm === 'bubble') {
      bubbleSort();
    } else {
      quickSort();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
        <Select
          value={algorithm}
          onValueChange={setAlgorithm}
          disabled={sorting}
        >
          <SelectTrigger className="w-40 rounded-md p-2 hover:bg-slate-400/30 transition-all duration-200">
            <SelectValue placeholder="Select Algorithm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bubble">Bubble Sort</SelectItem>
            <SelectItem value="quick">Quick Sort</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-4">
          <span className="text-sm">Speed:</span>
          <Slider
            value={[speed]}
            onValueChange={(value) => setSpeed(value[0])}
            min={1}
            max={100}
            step={1}
            className="w-32"
            disabled={sorting}
          />
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm">Size:</span>
          <Slider
            value={[arraySize]}
            onValueChange={(value) => setArraySize(value[0])}
            min={5}
            max={50}
            step={1}
            className="w-32"
            disabled={sorting}
          />
        </div>

        <div className="space-x-2">
          <Button onClick={generateArray} 
            className="border pr-2 pl-2 pt-1 pb-1 hover:bg-slate-400/30 transition-all duration-200"
          disabled={sorting}>
            Reset
          </Button>
          <Button onClick={startSort} 
            className="border pr-2 pl-2 pt-1 pb-1 hover:bg-slate-400/30 transition-all duration-200"
          disabled={sorting}>
            Sort
          </Button>
        </div>
      </div>

      <div className="h-64 flex items-end justify-center gap-1 border rounded-lg p-4">
        {array.map((value, index) => (
          <div
            key={index}
            className="w-4 bg-white transition-all duration-200"
            id ="bars"
            style={{
              height: `${value}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;