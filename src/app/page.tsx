"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaCode } from "react-icons/fa";

export default function Home() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const { toast } = useToast();

  // Fetch Quote handler 
  const fetchQuote = async () => {
    try {
      const response = await fetch("http://api.quotable.io/random");
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch {
      console.log("Error");
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 m-auto">
      <Card className="flex flex-col bg-gray-100 rounded-lg shadow-lg p-6 max-w-lg mx-auto">
        <CardHeader className="text-center mb-4">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Random Quotes Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="underline text-lg">Quote:</Label>
                <p className="p-4 text-lg leading-6 text-gray-800 border border-gray-300 rounded-md bg-white h-32 flex items-center justify-center text-center">
                  {quote}
                </p>
                <Label htmlFor="name" className="underline text-lg">Quoted by:</Label>
                <p className="p-4 text-lg leading-6 text-gray-800 border border-gray-300 rounded-md bg-gray-200 h-12 flex items-center justify-center">
                  {author}
                </p>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between gap-4 mt-4">
          <Button
            variant={'ghost'}
            onClick={copyQuote}
            className="text-center rounded-md px-4 py-2 text-base border border-gray-300 hover:bg-black hover:text-white"
          >
            Copy Quote
          </Button>
          <Button
            onClick={fetchQuote}
            variant={'ghost'}
            className="flex-1 text-center rounded-md px-4 py-2 text-base bg-black text-white hover:text-white hover:bg-slate-950"
          >
            Generate
          </Button>
        </CardFooter>
        <footer className="flex justify-center items-center p-4 mt-4 rounded-lg bg-gray-200 w-[200px] mx-auto">
          <div className="flex items-center gap-3">
            <FaCode size={30} className="text-gray-800 cursor-pointer" />
            <Link
              href={"https://github.com/MoosaHaroon6"}
              rel="noreferrer"
              target="_blank"
              className="text-gray-800 hover:opacity-75"
            >
              <span className="sr-only">GitHub</span>
              <svg
                className="w-8 h-8 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </footer>
      </Card>
    </div>
  );
}
