import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

interface StatusIconProps {
  status: string | null;
}

export function StatusIcon({ status }: StatusIconProps) {
  if (status === null) {
    return <PriorityHighOutlinedIcon color="warning" />;
  }
  if (status === 'error') {
    return <ErrorOutlineOutlinedIcon color="error" />;
  }
  return <CheckCircleOutlineOutlinedIcon color="success" />;
}
