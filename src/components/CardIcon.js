import EjectIcon from "@mui/icons-material/Eject";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import DiamondIcon from "@mui/icons-material/Diamond";
import NightlifeIcon from "@mui/icons-material/Nightlife";

const ICON_MAP = {
  Spades: <EjectIcon fontSize="large"></EjectIcon>,
  Hearts: <HeartBrokenIcon fontSize="large"></HeartBrokenIcon>,
  Diamonds: <DiamondIcon fontSize="large"></DiamondIcon>,
  Clubs: <NightlifeIcon fontSize="large"></NightlifeIcon>,
};

export function CardIcon({suit}){
  return ICON_MAP[suit];
}