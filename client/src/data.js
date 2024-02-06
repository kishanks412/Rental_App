import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiByzantinTemple,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import {
  FaSkiing,
  FaPumpSoap,
  FaShower,
  FaFireExtinguisher,
  FaUmbrellaBeach,
  FaKey,
} from "react-icons/fa";
import { FaHouseUser, FaPeopleRoof, FaKitchenSet, FaSnowman, FaMountainSun } from "react-icons/fa6";
import { LiaMountainSolid } from "react-icons/lia";

import {
  BiSolidWasher,
  BiSolidDryer,
  BiSolidFirstAid,
  BiWifi,
  BiSolidFridge,
  BiWorld,
} from "react-icons/bi";
import { BsSnow, BsFillDoorOpenFill, BsPersonWorkspace } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla, MdMicrowave, MdBalcony, MdYard, MdPets } from "react-icons/md";
import {
  PiBathtubFill,
  PiCoatHangerFill,
  PiTelevisionFill,
} from "react-icons/pi";
import { TbIroning3 } from "react-icons/tb";
import {
  GiHeatHaze,
  GiCctvCamera,
  GiBarbecue,
  GiToaster,
  GiCampfire,
} from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";

export const categories = [
  {
    label: "All",
    icon: <BiWorld />,
  },
  {
    img: "assets/Cate_Pictures/Temple.jpg",
    label: "Temples",
    icon: <GiByzantinTemple />,
    description: "This property is near the temples",
  },
  {
    img: "assets/Cate_Pictures/modern.webp",
    label: "Iconic cities",
    icon: <MdOutlineVilla />,
    description: "This property is modern!",
  },
  
  {
    img: "assets/Cate_Pictures/snow.jpg",
    label: "Snowfall Area",
    icon: <FaSnowman />,
    description: "This property is near the snow area!",
  },
  {
    img: "assets/Cate_Pictures/countryside.webp",
    label: "Mountain Regions",
    icon: <LiaMountainSolid />,
    description: "This property is in the mountain!",
  },
  {
    img: "assets/Cate_Pictures/beach.jpg",
    label: "Beachfront",
    icon: <TbBeach />,
    description: "This property is close to the beach!",
  },
  {
    img: "assets/Cate_Pictures/island.webp",
    label: "Islands",
    icon: <GiIsland />,
    description: "This property is on an island!",
  },
 
  {
    img: "assets/Cate_Pictures/pool.jpg",
    label: "Amazing Pools",
    icon: <TbPool />,
    description: "This property has a beautiful pool!",
  },
  {
    img: "assets/Cate_Pictures/lake.webp",
    label: "Lakefront",
    icon: <GiBoatFishing />,
    description: "This property is near a lake!",
  },
  {
    img: "assets/Cate_Pictures/skiing.jpg",
    label: "Ski-in/out",
    icon: <FaSkiing />,
    description: "This property has skiing activies!",
  },
  {
    img: "assets/Cate_Pictures/castle.webp",
    label: "Castles",
    icon: <GiCastle />,
    description: "This property is an ancient castle!",
  },
  {
    img: "assets/Cate_Pictures/cave.jpg",
    label: "Caves",
    icon: <GiCaveEntrance />,
    description: "This property is in a spooky cave!",
  },
  {
    img: "assets/Cate_Pictures/camping.jpg",
    label: "Camping",
    icon: <GiForestCamp />,
    description: "This property offers camping activities!",
  },
  {
    img: "assets/Cate_Pictures/desert.webp",
    label: "Desert",
    icon: <GiCactus />,
    description: "This property is in the desert!",
  },
  {
    img: "assets/Cate_Pictures/lux.jpg",
    label: "Luxury",
    icon: <IoDiamond />,
    description: "This property is brand new and luxurious!",
  },
];

export const types = [
  {
    name: "An entire place",
    description: "Guests have the whole place to themselves",
    icon: <FaHouseUser />,
  },
  {
    name: "Room(s)",
    description:
      "Guests have their own room in a house, plus access to shared places",
    icon: <BsFillDoorOpenFill />,
  },
  {
    name: "A Shared Room",
    description:
      "Guests sleep in a room or common area that maybe shared with you or others",
    icon: <FaPeopleRoof />,
  },
];

export const facilities = [
  {
    name: "Bath tub",
    icon: <PiBathtubFill />,
  },
  {
    name: "Personal care products",
    icon: <FaPumpSoap />,
  },
  {
    name: "Outdoor shower",
    icon: <FaShower />,
  },
  {
    name: "Washer",
    icon: <BiSolidWasher />,
  },
  {
    name: "Dryer",
    icon: <BiSolidDryer />,
  },
  {
    name: "Hangers",
    icon: <PiCoatHangerFill />,
  },
  {
    name: "Iron",
    icon: <TbIroning3 />,
  },
  {
    name: "TV",
    icon: <PiTelevisionFill />,
  },
  {
    name: "Dedicated workspace",
    icon: <BsPersonWorkspace />
  },
  {
    name: "Air Conditioning",
    icon: <BsSnow />,
  },
  {
    name: "Heating",
    icon: <GiHeatHaze />,
  },
  {
    name: "Security cameras",
    icon: <GiCctvCamera />,
  },
  {
    name: "Fire extinguisher",
    icon: <FaFireExtinguisher />,
  },
  {
    name: "First Aid",
    icon: <BiSolidFirstAid />,
  },
  {
    name: "Wifi",
    icon: <BiWifi />,
  },
  {
    name: "Cooking set",
    icon: <FaKitchenSet />,
  },
  {
    name: "Refrigerator",
    icon: <BiSolidFridge />,
  },
  {
    name: "Microwave",
    icon: <MdMicrowave />,
  },
  {
    name: "Stove",
    icon: <GiToaster />,
  },
  {
    name: "Barbecue grill",
    icon: <GiBarbecue />,
  },
  {
    name: "Outdoor dining area",
    icon: <FaUmbrellaBeach />,
  },
  {
    name: "Private patio or Balcony",
    icon: <MdBalcony />,
  },
  {
    name: "Camp fire",
    icon: <GiCampfire />,
  },
  {
    name: "Garden",
    icon: <MdYard />,
  },
  {
    name: "Free parking",
    icon: <AiFillCar />,
  },
  {
    name: "Self check-in",
    icon: <FaKey />
  },
  {
    name: " Pet allowed",
    icon: <MdPets />
  }
];
