import { useCallback } from "react";
import LocalstorageDb from "./LocalstorageDb";

export default function useCampaignService() {
  const dbService = LocalstorageDb();

  const CAMPAIGNS_KEYWORD = "campaigns";

  const uid = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
         + Math.random().toString(16).slice(2)
         + Date.now().toString(16).slice(4);
  };

  const initDbData = useCallback((data : any) => {
    data = data || {
      CAMPAIGNS_KEYWORD: {}
    }
    return data;
  }, []);

  const saveCampaign = useCallback((title, content) => {
    const id = uid();
    const campaign = {
      'id': id,
      'title': title,
      'content': content
    }
    let data : any = dbService.getData();
    data = initDbData(data);
    let allCampaigns = data[CAMPAIGNS_KEYWORD]
    allCampaigns[id] = campaign;
    dbService.saveData(data);
  }, []);

  const getAllCampaigns = useCallback(() => {
    let data : any = dbService.getData();
    data = initDbData(data);
    return data!['campaigns'];
  }, []);

  return {
    saveCampaign
  }
}