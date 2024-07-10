import { useEffect, useState } from "react";
import { getChannelsAPI } from "@/apis/articles";

const useGetChannels = () => {
  const [channels, setChannels] = useState();

  useEffect(() => {
    async function fetchChannels() {
      const res = await getChannelsAPI();
      setChannels(
        res.data.channels.map((item) => {
          return {
            label: item.name,
            value: item.id,
          };
        })
      );
    }
    fetchChannels();
  }, []);

  return channels;
};

export { useGetChannels };
