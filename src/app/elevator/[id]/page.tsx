"use client";
import { requestApi } from "@/utils/requestApi";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { updateAtParser } from "@/utils/updateAtParser";
import ElevatorDetails from "./ElevatorDetails";
import type { Elevator, AllowedElevatorEditData } from "../elevator.types";
import { Loader } from "@/components/common/Loader/Loader";
import { Box } from "@mui/material";

export default function ElevatorDetailsContainer() {
  const { id: elevatorId } = useParams();
  const router = useRouter();
  const [displayedElevatorData, setDisplayedElevatorData] =
    useState<Elevator | null>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (elevatorId) {
      fetchElevatorData().then(() => setIsLoading(false));
    }
  }, [elevatorId]);

  async function updateElevator(
    data: AllowedElevatorEditData,
    elevatorId: string
  ) {
    const result = await requestApi({
      path: `/elevator/${elevatorId}`,
      method: "PUT",
      data,
    });
  }

  async function fetchElevatorData() {
    const { data: fetchedElevatorData } = await requestApi<Elevator>({
      path: `/elevator/${elevatorId}`,
      method: "GET",
    });
    if (fetchedElevatorData?.updatedAt) {
      fetchedElevatorData.updatedAt = updateAtParser(
        fetchedElevatorData.updatedAt
      );
    }
    setDisplayedElevatorData(fetchedElevatorData);
  }

  const handleGoBack = () => {
    setDisplayedElevatorData(null);
    router.push(`/elevator`);
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
  if (!displayedElevatorData) {
    return null;
  }

  return (
    <>
      <ElevatorDetails
        handleGoBack={handleGoBack}
        displayedElevatorData={displayedElevatorData}
        updateElevator={updateElevator}
        elevatorId={elevatorId as string}
      />
    </>
  );
}
