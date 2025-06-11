import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import colors from "./styles/colors";

export function getRoomIcons(room){
if (room === '1') {
    return <MaterialIcons name="kitchen" size={20} color={colors.primary}/>;
  } else if (room === '2') {
    return <MaterialCommunityIcons name="sofa-outline" size={20} color={colors.primary}/>;
  } else if (room === '12') {
    return <MaterialIcons name="table-restaurant" size={20} color={colors.primary}/>;
  } else if (room === '10') {
    return <MaterialCommunityIcons name="toilet" size={20} color={colors.primary}/>
  } else if(room === '7'){
    return <FontAwesome6 name="stairs" size={20} color={colors.primary} size={25} color={colors.primary}/>
  } else if(room === '8'){
    return <FontAwesome6 name="bath" size={20} color={colors.primary}/>
  } else if(room === '6'){
    return <MaterialIcons name="grass"size={20} color={colors.primary}/>
  } else if(room === '5'){
    return <MaterialIcons name="other-houses"size={20} color={colors.primary}/>
  } else if(room === '11'){
    return <MaterialCommunityIcons name="door-closed" size={20} color={colors.primary}/>
  } else{
    return <MaterialIcons name="other-houses"size={20} color={colors.primary}/>
  };
};

export function getRoomNames(room){
  if(room === '1'){
    return "kitchen"
  } else  if(room === '2'){
    return "living room"
  }
  else  if(room === '5'){
    return "front garden"
  }
   if(room === '6'){
    return "back garden"
  }
   if(room === '7'){
    return "stairs and landing"
  }
   if(room === '8'){
    return "bathroom"
  }
  
   if(room === '10'){
    return "downstairs loo"
  }
   if(room === '11'){
    return "coat cuboard"
  }
   if(room === '12'){
    return "dining room"
  }
   else{
    return "general"
  }
}

export function assignPoints(task){
  if(task === "take the bins out for bin day on Wednesdays" || task === "clean the toilet" || task === "empty the bin"){
    return 200
  }
  if(task === "water the plants" || task === "sort the post"){
    return 25
  }
  else {
    return 75
  }
}


