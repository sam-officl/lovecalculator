import { useEffect, useState } from 'react';
import { Trash2, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { LoveResult } from '../types/database';
import { useAuth } from '../contexts/AuthContext';

interface SavedResultsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SavedResults({ isOpen, onClose }: SavedResultsProps) {
  const [results, setResults] = useState<LoveResult[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen && user) {
      loadResults();
    }
  }, [isOpen, user]);

  const loadResults = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('love_results')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setResults(data);
    }
    setLoading(false);
  };

  const deleteResult = async (id: string) => {
    const { error } = await supabase
      .from('love_results')
      .delete()
      .eq('id', id);

    if (!error) {
      setResults(results.filter(r => r.id !== id));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
            Saved Results
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : results.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No saved results yet!</p>
          ) : (
            <div className="space-y-3">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="font-semibold text-lg">
                      {result.name1} + {result.name2}
                    </div>
                    <div className="text-2xl font-bold text-pink-600">
                      {result.score}%
                    </div>
                    <div className="text-sm text-gray-600">{result.message}</div>
                  </div>
                  <button
                    onClick={() => deleteResult(result.id)}
                    className="text-red-400 hover:text-red-600 transition-colors p-2"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
