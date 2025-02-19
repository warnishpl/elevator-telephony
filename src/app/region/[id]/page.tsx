"use client";
import { requestApi } from "@/utils/requestApi";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import RegionDetails from "./RegionDetails";
import { Loader } from "@/components/common/Loader/Loader";
import { Box } from "@mui/material";

type Region = {
  name: string;
};

export default function RegionDetailsContainer() {
  const { id: regionId }: { id: string } = useParams();
  const router = useRouter();
  const [displayedRegionData, setDisplayedRegionData] = useState<Region | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  async function fetchRegionDetails() {
    try {
      const res = await requestApi({
        path: `/region/${regionId}`,
        method: "GET",
      });
      setDisplayedRegionData(res.data as Region);
    } catch (error) {
      console.error("Błąd podczas pobierania danych regionu:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchRegionDetails();
  }, [regionId]);

  async function updateRegion(name: string) {
    await requestApi({
      path: `/region/${regionId}`,
      method: "PUT",
      data: { name },
    });
  }

  const handleGoBack = () => {
    setDisplayedRegionData(null);
    router.push(`/region`);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "calc( 100dvh - 8rem )",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </Box>
    );
  }

  if (!displayedRegionData) {
    return null;
  }

  return (
    <RegionDetails
      handleGoBack={handleGoBack}
      displayedRegionData={displayedRegionData}
      updateRegion={updateRegion}
      regionId={regionId}
    />
  );
}
