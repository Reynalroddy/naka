import React,{useEffect, useState} from 'react'
import '../styles/Home.css'
import lp1 from '../slider/mae.gif'
import { connectWallet,sendEth } from '../script/eth'
const Mint = () => {
    const [maxSupply, setMaxSupply] = useState(222)
    const [totalMinted, setTotalMinted] = useState(0)
    const [maxMintAmount, setMaxMintAmount] = useState(5)
  
    const [ready,setIsReady] = useState(false)

    const [status, setStatus] = useState(null)
    const [mintAmount, setMintAmount] = useState(1)
    const [isMinting, setIsMinting] = useState(false)
    const incrementMintAmount = () => {
        if (mintAmount < maxMintAmount) {
          setMintAmount(mintAmount + 1)
        }
      }
    
      const decrementMintAmount = () => {
        if (mintAmount > 1) {
          setMintAmount(mintAmount - 1)
        }
      }

      const wall=async()=>{
        let g = await connectWallet();
        console.log(g);
        g?setIsReady(true):setIsReady(false)
      }
      const total = Number.parseFloat(0.15 * mintAmount).toFixed(
        2
      )

      useEffect(() => {

        const int = setInterval(()=>{
            if(totalMinted === 222){
                clearInterval(int);
            }
            setTotalMinted((prev)=>{
return prev + 3
            })
        },10000)
       
          return () => {
            clearInterval(int);
          };
      }, [totalMinted])
      
  return (
    <div className="min-h-screen h-full w-full overflow-hidden flex flex-col items-center justify-center g " style={{
        background:'#020052'
    }}>
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* <img
        src="../slider/1s.jpg"
        className="animate-pulse-slow absolute inset-auto block w-full min-h-screen object-cover"
      /> */}

      <div className="flex flex-col items-center justify-center h-full w-full px-2 md:px-10">
        <div className="relative z-1 md:max-w-3xl w-full bg-gray-900/90 filter backdrop-blur-sm py-4 rounded-md px-2 md:px-10 flex flex-col items-center">
         
          <h1 className="font-coiny uppercase font-bold text-3xl md:text-4xl bg-gradient-to-br  from-brand-green to-brand-blue bg-clip-text text-white mt-3">
            Limited Sale
          </h1>
         

          <div className="flex flex-col md:flex-row md:space-x-14 w-full mt-10 md:mt-14">
            <div className="relative w-full">
              <div className="font-coiny z-10 absolute top-1 left-2 opacity-80 filter backdrop-blur-lg text-base px-4 py-1 bg-black border border-brand-purple rounded-md flex items-center justify-center text-white font-semibold">
                <p>
                  <span className="text-brand-pink">{totalMinted}</span> /{' '}
                  {maxSupply}
                </p>
              </div>

              <img
                src={lp1}
                className="object-cover w-full sm:h-[280px] md:w-[250px] rounded-md"
              />
            </div>

            <div className="flex flex-col items-center w-full px-4 mt-16 md:mt-0">
              <div className="font-coiny flex items-center justify-between w-full">
                <button
                  className="w-14 h-10 md:w-16 md:h-12 flex items-center justify-center text-brand-background hover:shadow-lg bg-gray-300 font-bold rounded-md"
                  onClick={incrementMintAmount}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 md:h-8 md:w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>

                <p className="flex items-center justify-center flex-1 grow text-center font-bold text-pink-500 text-3xl md:text-4xl">
                  {mintAmount}
                </p>

                <button
                  className="w-14 h-10 md:w-16 md:h-12 flex items-center justify-center text-brand-background hover:shadow-lg bg-gray-300 font-bold rounded-md"
                  onClick={decrementMintAmount}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 md:h-8 md:w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 12H6"
                    />
                  </svg>
                </button>
              </div>

              <p className="text-sm text-blue-200 tracking-widest mt-3">
                Max Mint Amount: {maxMintAmount}
              </p>

              <div className="border-t border-b py-4 mt-16 w-full">
                <div className="w-full text-xl font-coiny flex items-center justify-between text-blue-500">
                  <p>Total</p>

                  <div className="flex items-center space-x-3">
                    <p>
                      {total}{' '}
                       ETH
                    </p>{' '}
                    <span className="text-gray-400">+ GAS</span>
                  </div>
                </div>
              </div>

              {/* Mint Button && Connect Wallet Button */}
              {ready ? (
                <button
                  className={` ${
                    isMinting
                      ? 'bg-gray-900 cursor-not-allowed'
                      : 'bg-gradient-to-br from-blue-300 to-blue-500 shadow-lg hover:shadow-blue-400/50'
                  } font-coiny mt-12 w-full px-6 py-3 rounded-md text-2xl text-white  mx-4 tracking-wide uppercase`}
                //   disabled={ isMinting}
                  onClick={()=>sendEth(total)}
                >
                 Mint
                </button>
              ) : (
                <button
                  className="font-coiny mt-12 w-full bg-gradient-to-br from-blue-300 to-blue-500 shadow-lg hover:shadow-blue-400/50  px-6 py-2 rounded-md text-2xl text-white  mx-4 tracking-wide uppercase"
                  onClick={wall}
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>

          {/* Status */}
          {/* {status && (
            <div
              className={`border ${
                status.success ? 'border-green-500' : 'border-brand-pink-400 '
              } rounded-md text-start h-full px-4 py-4 w-full mx-auto mt-8 md:mt-4"`}
            >
              <p className="flex flex-col space-y-2 text-white text-sm md:text-base break-words ...">
                {status.message}
              </p>
            </div>
          )} */}

          {/* Contract Address */}
          {/* <div className="border-t border-gray-800 flex flex-col items-center mt-10 py-2 w-full">
            <h3 className="font-coiny text-2xl text-brand-pink uppercase mt-6">
              Contract Address
            </h3>
            <a
              href={`https://rinkeby.etherscan.io/address/${config.contractAddress}#readContract`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 mt-4"
            >
              <span className="break-all ...">{config.contractAddress}</span>
            </a>
          </div> */}
        </div>
      </div>
    </div>
  </div>
)
}

export default Mint