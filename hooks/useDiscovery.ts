/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { HomeAssistantInstance } from "../types";

const getInstance = async () => {
  const res = await fetch('/api/discover');
  return res.json();
}

const useDiscovery = (max?: number) => {
  const id = useRef<any>();
  const [instances, setInstances] = useState<Record<string, HomeAssistantInstance>>({});
  
  const findInstance = async () => {
    const res = await getInstance();
    if (res.uuid) {
      setInstances(
        (i) => ({
          ...i,
          [res.uuid]: res,
        })
      )
    }
  };

  useEffect(() => {
    id.current = setInterval(findInstance, 250);
    return () => id.current ? clearInterval(id.current) : null;
  }, []);

  useEffect(() => {
    if (max && Object.keys(instances).length >= max) {
      clearInterval(id.current);
    }
  }, [instances]);

  return {
    loading: max ? Object.keys(instances).length < max : true,
    instances: Object.values(instances),
  }
};

export default useDiscovery;