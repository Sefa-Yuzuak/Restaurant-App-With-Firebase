import { useCallback, useState } from "react";

const useHttp = () => {
  //url ve fetch datanın fonksiyonunu alması gerekiyor

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyFetch) => {
    //url ve fetch datanın fonksiyonunu alması gerekiyor
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        headers: requestConfig.headers ? requestConfig.headers : {},
      });

      if (!response.ok) {
        throw new Error("Request faied");
      }

      const data = await response.json();
      applyFetch(data); //get request yaptığımızda kullanılır. 
      //önce boş array oluştur fonksiyon içinde. fonksiyona prop olarak item yaz 
      //for dögüsü ile data içndeki bütün itemlari boş arraye pushla
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);
  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
