import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

function getRoomIcons(room){
if (room === 'kitchen') {
    return <MaterialIcons name="kitchen"/>;
  } else if (room === 'living room') {
    return <MaterialCommunityIcons name="sofa-outline"/>;
  } else if (room === 'dining room') {
    return <MaterialIcons name="table-restaurant" />;
  } else if (room === 'downstairs loo') {
    return <MaterialCommunityIcons name="toilet"/>
  } else if(room === 'stairs and landing'){
    return <FontAwesome6 name="stairs"/>
  } else if(room === 'bathroom'){
    return <FontAwesome6 name="bath"/>
  } else if(room === 'garden'){
    return <MaterialIcons name="grass"/>
  } else if(room === 'front garden'){
    return <MaterialIcons name="other-houses"/>
  } else if(room === 'coat cuboard'){
    return <MaterialCommunityIcons name="door-closed"/>
  } else{
    return <MaterialIcons name="other-houses"/>
  };
};

export default getRoomIcons