"use client";

import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

export default function Home() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const api = "Mk/aZnnWPklqdRdsEUkiBQ==8nsJsGtg6L0wJ98o";

  const fetchQuote = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
        headers: { "X-Api-Key": api }
      });

      if (!response.ok) throw new Error('Failed to fetch quote');
      const [data] = await response.json();

      setQuote(data.quote);
      setAuthor(data.author);

      const catInCap = data.category[0].toUpperCase() + data.category.slice(1);
      setCategory(catInCap);

    } catch (error) {
      toast({
        title: "Failed to fetch a new quote. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const copyQuote = async () => {
    try {
      await navigator.clipboard.writeText(quote);
      toast({ title: "Quote Copied to clipboard!" });
    } catch {
      toast({ title: "Error copying quote" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Random Quotes Generator
          </h1>

          <div className="mb-6 space-y-2">
            <span className="text-sm font-medium text-gray-500">Quote</span>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-300 to-purple-300 rounded-lg blur opacity-20"></div>
              <p className="relative p-4 text-lg italic text-gray-800 bg-white rounded-lg border-l-4 border-pink-400 shadow-inner">
                {quote || "Failure is a great teacher, and I think when you make mistakes."}
              </p>
            </div>
          </div>

          {/*Auth and category*/}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-500">Author</span>
              <p className="p-3 text-gray-700 bg-gray-50 rounded-lg shadow-inner">
                {author}
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-500">Category</span>
              <p className="p-3 text-gray-700 bg-gray-50 rounded-lg shadow-inner">
                {category}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={copyQuote}
              disabled={!quote}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy
            </button>
            <button
              onClick={fetchQuote}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
              {isLoading ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
