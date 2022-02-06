import { useCallback } from "react";
import LocalstorageDb from "./LocalstorageDb";
import LocalstorageDefault from "./LocalstorageDefault";

export default function useCampaignService() {
  const dbService = LocalstorageDb();

  const CAMPAIGNS_KEYWORD = "campaigns";

  const uid = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
         + Math.random().toString(16).slice(2)
         + Date.now().toString(16).slice(4);
  };

  const initDbData = useCallback((data : any) => {
    let emptyData : any = LocalstorageDefault().DEFAULT_DATA;
    let initedData = data || emptyData;
    return initedData;
  }, []);

  const saveCampaign = useCallback((title, content, walletAddress) => {
    const id = uid();
    const userId = uid();
    const campaign = {
      'id': id,
      'created_at': new Date(),
      'user': walletAddress,
      'title': title,
      'content': content
    }
    let data : any = dbService.getData();
    console.log(data);
    data = initDbData(data);
    let allCampaigns = data[CAMPAIGNS_KEYWORD];
    console.log(allCampaigns);
    allCampaigns[id] = campaign;
    dbService.saveData(data);
  }, []);

  const getAllCampaigns = useCallback(() => {
    let data : any = dbService.getData();
    data = initDbData(data);
    // This is just in case we are invoking the service for
    // the first time and no data is populated yet
    dbService.saveData(data);
    return data![CAMPAIGNS_KEYWORD] || {};
  }, []);

  return {
    saveCampaign,
    getAllCampaigns
  }
}