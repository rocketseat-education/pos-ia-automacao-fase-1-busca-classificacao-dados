import { ChromaClient } from "chromadb";
import { useEffect, useState } from "react";
import { env } from "chromadb-default-embed";

env.useBrowserCache = false;
env.allowLocalModels = false;

export default function useChroma (){
    const [chromaCollection, setChromaCollection] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const initializeChroma = async () => {
          const chromaClient = new ChromaClient();
          const collection = await chromaClient.getOrCreateCollection({ 
            name: "movies",
            space: "cosine"
           });
    
          setChromaCollection(collection);
          setIsConnected(true);
        }
    
        initializeChroma();
      }, []);

    return [chromaCollection, isConnected];
}