import { useSession } from '@clerk/clerk-react';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const useFetch = (cb, options = {}) => {
	const [data, setData] = React.useState(undefined);
	const [loading, setLoading] = React.useState(null);
	const [error, setError] = React.useState(null);

	const { session } = useSession();

	const fn = async (...args) => {
		setLoading(true);
		setError(null);

		try {
			const supabaseToken = await session.getToken({
				template: 'supabase',
			});

			const response = await cb(supabaseToken, options, ...args);
			setData(response);
			setError(null);
		} catch (error) {
			setError(error);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};
	return { data, error, loading, fn };
};

export default useFetch;
