import { useState } from 'react';
import { Heart, Sparkles, Share2, Download, Copy, Check } from 'lucide-react';
import { calculateLove, getLoveMessage, getDetailedMessage } from './lib/loveCalculator';
import { downloadResultAsImage } from './lib/imageGenerator';
import { HeartAnimation } from './components/HeartAnimation';

interface Result {
  name1: string;
  name2: string;
  score: number;
  message: string;
  detailedMessage: string;
}

function App() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [showHearts, setShowHearts] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCalculate = () => {
    if (!name1.trim() || !name2.trim()) return;

    const score = calculateLove(name1, name2);
    const message = getLoveMessage(score);
    const detailedMessage = getDetailedMessage(score);

    setResult({
      name1: name1.trim(),
      name2: name2.trim(),
      score,
      message,
      detailedMessage,
    });
    setShowHearts(true);

    setTimeout(() => setShowHearts(false), 5000);
  };

  const handleDownload = async () => {
    if (!result) return;
    await downloadResultAsImage(result.name1, result.name2, result.score, result.message);
  };

  const handleShare = () => {
    if (!result) return;

    const text = `${result.name1} + ${result.name2} = ${result.score}% ${result.message}`;
    const url = window.location.href;
    const shareText = `${text}\n\n${url}`;

    if (navigator.share) {
      navigator.share({
        title: 'Love Calculator Result',
        text: text,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 relative overflow-hidden font-poppins">
      {showHearts && <HeartAnimation />}

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="text-pink-500 fill-pink-500 animate-pulse" size={48} />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent">
                Love Calculator
              </h1>
              <Heart className="text-pink-500 fill-pink-500 animate-pulse" size={48} />
            </div>
            <p className="text-xl text-gray-700 font-medium">
              Find your soulmate compatibility!
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 backdrop-blur-sm bg-opacity-90">
            <div className="space-y-6">
              <div>
                <label htmlFor="name1" className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  id="name1"
                  type="text"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  placeholder="Enter first name"
                  className="w-full px-6 py-4 border-2 border-pink-200 rounded-2xl focus:ring-4 focus:ring-pink-300 focus:border-pink-400 outline-none transition-all text-lg font-poppins"
                  onKeyPress={(e) => e.key === 'Enter' && handleCalculate()}
                />
              </div>

              <div className="flex justify-center">
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full p-3 shadow-lg">
                  <Heart className="fill-white" size={24} />
                </div>
              </div>

              <div>
                <label htmlFor="name2" className="block text-sm font-semibold text-gray-700 mb-2">
                  Second Name
                </label>
                <input
                  id="name2"
                  type="text"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  placeholder="Enter second name"
                  className="w-full px-6 py-4 border-2 border-pink-200 rounded-2xl focus:ring-4 focus:ring-pink-300 focus:border-pink-400 outline-none transition-all text-lg font-poppins"
                  onKeyPress={(e) => e.key === 'Enter' && handleCalculate()}
                />
              </div>

              <button
                onClick={handleCalculate}
                disabled={!name1.trim() || !name2.trim()}
                className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white font-bold py-5 rounded-2xl hover:from-pink-600 hover:via-rose-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg font-poppins"
              >
                <Sparkles size={24} />
                Calculate Love
              </button>
            </div>

            {result && (
              <div className="mt-8 p-8 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl border-2 border-pink-200 animate-fade-in">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-gray-700 mb-2 font-poppins">
                    {result.name1} + {result.name2}
                  </div>
                  <div className="text-7xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-3 font-poppins">
                    {result.score}%
                  </div>
                  <div className="text-3xl font-bold mb-2 font-poppins">{result.message}</div>
                  <div className="text-lg text-gray-600 mb-6 font-poppins">{result.detailedMessage}</div>

                  <div className="flex gap-3 justify-center flex-wrap">
                    <button
                      onClick={handleDownload}
                      className="bg-white text-pink-600 px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 font-semibold border-2 border-pink-200 font-poppins hover:bg-pink-50"
                    >
                      <Download size={20} />
                      Download
                    </button>
                    <button
                      onClick={handleShare}
                      className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 font-semibold font-poppins"
                    >
                      {copied ? <Check size={20} /> : <Share2 size={20} />}
                      {copied ? 'Copied!' : 'Share Link'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-center mt-8 text-gray-600 font-poppins">
            <p className="text-sm">For entertainment purposes only</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
