import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import colors from "./styles/colors";

function getRoomIcons(room){
if (room === 'kitchen') {
    return <MaterialIcons name="kitchen" size={20} color={colors.primary}/>;
  } else if (room === 'living room') {
    return <MaterialCommunityIcons name="sofa-outline" size={20} color={colors.primary}/>;
  } else if (room === 'dining room') {
    return <MaterialIcons name="table-restaurant" size={20} color={colors.primary}/>;
  } else if (room === 'downstairs loo') {
    return <MaterialCommunityIcons name="toilet" size={20} color={colors.primary}/>
  } else if(room === 'stairs and landing'){
    return <FontAwesome6 name="stairs" size={20} color={colors.primary} size={25} color={colors.primary}/>
  } else if(room === 'bathroom'){
    return <FontAwesome6 name="bath" size={20} color={colors.primary}/>
  } else if(room === 'garden'){
    return <MaterialIcons name="grass"size={20} color={colors.primary}/>
  } else if(room === 'front garden'){
    return <MaterialIcons name="other-houses"size={20} color={colors.primary}/>
  } else if(room === 'coat cuboard'){
    return <MaterialCommunityIcons name="door-closed" size={20} color={colors.primary}/>
  } else{
    return <MaterialIcons name="other-houses"size={20} color={colors.primary}/>
  };
};

export default getRoomIcons