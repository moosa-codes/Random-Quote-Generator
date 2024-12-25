"use client";

import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

export default function Home() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState();
  const { toast } = useToast();

  // Fetch Quote handler 
  const api = "Mk/aZnnWPklqdRdsEUkiBQ==8nsJsGtg6L0wJ98o" // you can use it :)

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
        headers: { "X-Api-Key": api }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      const [data] = await response.json();
      setQuote(data.quote);
      setAuthor(data.author);
      const catInCap = data.category[0].toUpperCase() + data.category.slice(1); // first character capital
      setCategory(catInCap);
      console.log(catInCap);

    } catch (error) {
      toast({
        title: "Failed to fetch a new quote. Please try again later.",
      });
    } finally {
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  // Copy to clipboard function
  const copyQuote = async () => {
    try {
      await navigator.clipboard.writeText(quote);
      toast({
        title: "Quote Copied to clipboard!"
      });
    } catch {
      toast({
        title: "Error copying quote"
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-pink-300 via-pink-200 to-pink-100">
      <div className="p-6 bg-white rounded-lg shadow-lg w-96">
        <h1 className="text-center text-3xl font-bold mb-6">Random Quotes Generator</h1>
        <div className="mb-4">
          <span className="font-semibold">Quote:</span>
          <p className="p-4 text-lg leading-6 italic text-gray-800 border border-gray-300 rounded-md bg-gray-200">
            {
              quote ? quote : "Failure is a great teacher, and I think when you make mistakes."
            }
          </p>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Quoted by:</span>
          <p className="p-4 text-lg text-gray-900 border border-gray-300 rounded-md bg-gray-200">
              {
                author ? author : "Steve Jobs"
             }
          </p>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Category:</span>
          <p
            className="p-4 text-lg text-gray-800 border border-gray-300 rounded-md bg-gray-200">
            {category ? category :"Success"}
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={copyQuote}
            className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition">
            Copy Quote
          </button>
          <button
            onClick={fetchQuote}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
            Generate
          </button>
        </div>
      </div>
    </div>

  );
}
