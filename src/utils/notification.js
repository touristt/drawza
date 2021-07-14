import { store } from 'react-notifications-component';
export const notification = (title, message, type, time = 3000) => {
	store.addNotification({
		title,
		message,
		type,
		insert: 'top',
		container: 'top-right',
		animationIn: ['animate__animated', 'animate__fadeIn'],
		animationOut: ['animate__animated', 'animate__fadeOut'],
		dismiss: {
			duration: time,
			onScreen: true,
		},
	});
};
