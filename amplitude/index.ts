import { Amplitude } from '@amplitude/react-native';

const amplitude = Amplitude.getInstance();
amplitude.init('c027ede0220d7c7082e6b2ab3a811c69'); // TODO ENV

export default amplitude;
