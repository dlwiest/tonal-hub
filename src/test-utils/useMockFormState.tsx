import { useState } from 'react';

function useMockFormState(action: (data: any) => Promise<any>) {
	const [state, setState] = useState(null);

	const mockFormAction = async (data: any) => {
		const result = await action(data);
		setState(result); // Update the internal state
		return result;
	};

	return [state, mockFormAction];
}

export default useMockFormState;
