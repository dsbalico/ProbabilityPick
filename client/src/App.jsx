import axios from 'axios';
import React, { useState } from 'react';
import './App.css';
import Ball from './components/Ball';
import LineDesign from './components/LineDesign';
import LottoTypeRadio from './components/LottoTypeRadio';
import PopupInfo from './components/PopupInfo';

function App() {
    const [result, setResult] = useState(['?', '?', '?', '?', '?', '?']);
    const [lottoType, setLottoType] = useState(null);
    const [method, setMethod] = useState(0);
    const [error, setError] = useState(false);
    
    const color = {
        42: "green",
        45: "orange",
        49: "red",
        55: "amber",
        58: "lime"
    }

    function generateRandomNumbers(min, max) {
        let randomNumbers = [];
        
        for (let i = 0; i < 6; i++) {
          const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
          randomNumbers.push(randomNumber);
        }
        
        return randomNumbers;
    }

    function getBallColor() { return color[lottoType] || "gray"; };

    async function generateNumbersBasedOnProbability() {
        await axios.get(`https://probability-pick.vercel.app/generate/${lottoType}`)
            .then(response => {
                return response.data;
            })
            .catch(() => {
                setError(true);
                return null;
            })
    }

    async function handleGenerate() {
        if (method === 1) setResult(generateRandomNumbers(1, lottoType))
        else {
            const result = await generateNumbersBasedOnProbability();

            if(result) setResult(result);
        }
    }
    
    return (
        <div className='h-screen bg-gray-50 flex justify-center text-gray-700'>
            <PopupInfo />
            <div className='self-center text-center px-2 sm:w-[500px]'>
                <LineDesign />

                {/* Header Title */}
                <div className='flex'>
                    <h1 className='text-2xl font-black uppercase bg-gray-700 py-2 text-white w-full text-center rounded-l-sm'>
                        PCSO Lotto
                    </h1>
                    <h1 className='text-2xl font-black uppercase bg-indigo-700 py-2 text-white w-full text-center rounded-r-sm'>
                        Generator
                    </h1>
                </div>

                <hr className='my-2' />

                {/* Generated Numbers */}
                <div className='grid grid-cols-6 gap-2 mt-8 mx-auto'>
                    {result.map((number, index) => {
                            return (
                                <Ball key={index} number={number} color={getBallColor()} />
                            )
                        })}
                </div>
                
                {/* Lotto Type */}
                <div className='p-3 bg-gray-100 border mt-8 rounded-t-sm'>
                    <div className='grid grid-cols-3'>
                        <LottoTypeRadio type={42} lottoType={lottoType} label="Lotto 6/42" setResult={setResult} setLottoType={setLottoType} />
                        <LottoTypeRadio type={45} lottoType={lottoType} label="Mega Lotto 6/45" setResult={setResult} setLottoType={setLottoType} />
                        <LottoTypeRadio type={49} lottoType={lottoType} label="Super Lotto 6/49" setResult={setResult} setLottoType={setLottoType} />
                    </div>

                    <div className='grid grid-cols-2 mt-1.5'>
                        <LottoTypeRadio type={55} lottoType={lottoType} label="Grand Lotto 6/55" setResult={setResult} setLottoType={setLottoType} />
                        <LottoTypeRadio type={58} lottoType={lottoType} label="Ultra Lotto 6/58" setResult={setResult} setLottoType={setLottoType} />
                    </div>
                </div>
                
                {/* Generation Method */}
                <div className='grid grid-cols-2'>
                    <div className='flex gap-2 justify-center py-3 bg-gray-600'>
                        <input className='self-center checked:accent-cyan-500 cursor-pointer' type='radio' name='method' checked={method === 0} onChange={() => {setMethod(0); setError(false);}} />
                        <label className='self-center font-medium text-sm tracking-widest text-white'>Probabilities</label>
                    </div>

                    <div className='flex gap-2 justify-center py-3 bg-gray-700'>
                        <input className='self-center checked:accent-cyan-500 cursor-pointer' type='radio' name='method' checked={method === 1} onChange={() => {setMethod(1); setError(false);}} />
                        <label className='self-center font-medium text-sm tracking-widest text-white'>Random</label>
                    </div>
                </div>
                
                {/* Generate Button */}
                <button onClick={() => handleGenerate()} disabled={lottoType === null} className='py-8 bg-indigo-700 mb-1 w-full text-white text-xl hover:bg-indigo-600 duration-500 transition-all  tracking-widest font-bold rounded-b-sm  disabled:border-4 disabled:hover:bg-indigo-700 border-dashed border-indigo-900'>
                    GENERATE
                </button>
                
                { // Show error message if server is not available
                    error ? (
                        <p className='text-xs bg-red-600 mb-1 rounded-sm text-red-200 tracking-wide border border-red-300 border-dashed py-0.5'>Probability is not available right now.</p>    
                    ): null
                }
                
                <LineDesign />
                
                {/* Note */}
                <p className='mt-2 text-xs text-center text-gray-600'>Please note that this generator is exclusively designed for PCSO lotto draws, as the data used to calculate probabilities is sourced solely from PCSO lotto draws.</p>
                
                {/* Footer */}
                <footer className='absolute bottom-0 left-0 w-full mb-4'>
                    <p className='text-center w-full text-gray-500 text-xs mb-0.5'>Made with ❤️ by Daniel Shan Balico</p>
                    <a href="https://github.com/dsbalico/ProbabilityPick" target='_blank' className='bg-gray-700 hover:bg-gray-600 transition-all text-white px-2 py-0.5 rounded-sm text-xs'>⭐ Star Me On Github</a>                
                </footer>
            </div>
        </div>
    )
}

export default App