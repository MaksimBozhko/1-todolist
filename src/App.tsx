import Container from '@mui/material/Container/Container'
import React, { useEffect } from 'react'
import './App.css'
import { ButtonAppBar } from './components/button/ButtonAppBar'
import { Todolists } from './components/todolists/Todolists'
import { ErrorSnackbar } from './components/ErrorSnackBar'
import { Route, Routes } from 'react-router-dom'
import { Login } from './components/login/Login'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { useAppDispatch, useAppSelector } from './common/hooks/hooks-RTK'
import { appThunks } from './common/toolkit/appSlice'

export const App = () => {
	const { isInitialized } = useAppSelector(state => state.app)
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(appThunks.initializeApp())
	}, [])
	if (!isInitialized)
		return (
			<Box
				sx={{ display: 'flex', justifyContent: 'center', marginTop: '500px' }}
			>
				<CircularProgress />
			</Box>
		)
	return (
		<>
			<ButtonAppBar />
			<Container fixed>
				<Routes>
					<Route path='/1-todolist' element={<Todolists />} />
					<Route path='/1-todolist/login' element={<Login />} />
				</Routes>
				<ErrorSnackbar />
			</Container>
		</>
	)
}

// import { useFormik } from 'formik';
// import React from 'react'
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
//
//
// // Types
// type LoginFieldsType = {
//     firstName: string
//     email: string
// }
//
// // Main
// export const Login = () => {
//
//     const formik = useFormik({
//         initialValues: {
//             firstName: '',
//             email: '',
//         },
//         validate: (values) => {
//             const errors: Partial<LoginFieldsType> = {};
//
//             if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//                 errors.email = 'Invalid email address';
//             }
//             return errors
//         },
//         onSubmit: values => {
//             alert(JSON.stringify(values, null, 2));
//         }
//     });
//
//     // Функция необходима для того, чтобы вебшторм не ругался на true в JSX
//     const getTrue = () => {
//         return true
//     }
//
//     return (
//         <form onSubmit={formik.handleSubmit}>
//             <div>
//                 <input placeholder={'Введите имя'} {...formik.getFieldProps('firstName')}/>
//             </div>
//             <div>
//                 <input placeholder={'Введите email'}{...formik.getFieldProps('email')}/>
//                 {getTrue() && <div style={{color: 'red'}}>{formik.errors.email}</div>}
//             </div>
//             <button type="submit">Отправить</button>
//         </form>
//     );
// }
//
// // App
// export const App = () => {
//     return (
//         <Routes>
//             <Route path={''} element={<Login/>}/>
//         </Routes>
//     )
// }
//
// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(<BrowserRouter><App/></BrowserRouter>)
//
// // 📜 Описание:
// // Загрузив приложение вы увидите ошибку под полем email, но вы еще ничего не ввели.
// // Исправьте 46 строку кода так, чтобы:
// // 1) Сообщение об ошибке показывалось только в том случае, когда email введен некорректно.
// // 2) Вместо ERROR должен быть конкретный текст ошибки прописанный в валидации к этому полю.
// // 3) Сообщение должно показываться только в том случае, когда мы взаимодействовали с полем.
// // Исправленную версию строки напишите в качестве ответа.
//
// // 🖥 Пример ответа: {true && <div style={{color: 'red'}}>error.email</div>}

// import React, { useEffect } from 'react'
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
// import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
// import axios from 'axios';
//
//
// // Utils
// console.log = () => {
// };
//
// // Api
// const instance = axios.create({
//     baseURL: 'xxx'
// })
//
// const api = {
//     getUsers() {
//         return instance.get('xxx')
//     }
// }
//
//
// // Reducer
// const initState = {
//     isLoading: false,
//     users: [] as any[]
// }
//
// type InitStateType = typeof initState
//
// const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
//     switch (action.type) {
//         case 'APP/SET-USERS':
//             /* 1 */
//             return {...state, users: action.users}
//         case 'APP/IS-LOADING':
//             /* 2 */
//             return {...state, isLoading: action.isLoading}
//         default:
//             return state
//     }
// }
//
// // Actions
// const setUsersAC = (users: any[]) => ({type: 'APP/SET-USERS', users} as const)
// const setLoadingAC = (isLoading: boolean) => ({type: 'APP/IS-LOADING', isLoading} as const)
// type ActionsType = | ReturnType<typeof setUsersAC> | ReturnType<typeof setLoadingAC>
//
//
// // Thunk
// const getUsersTC = (): AppThunk => (dispatch) => {
//     /* 3 */
//     dispatch(setLoadingAC(true))
//     api.getUsers()
//         .then((res) => {
//             /* 4 */
//             dispatch(setLoadingAC(false))
//             /* 5 */
//             dispatch(setUsersAC(res.data.data))
//         })
// }
//
// // Store
// const rootReducer = combineReducers({
//     app: appReducer,
// })
//
// const store = createStore(rootReducer, applyMiddleware(thunk))
// type RootState = ReturnType<typeof store.getState>
// type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>
// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>
// const useAppDispatch = () => useDispatch<AppDispatch>()
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
//
//
// // Loader
// export const Loader = () => {
//     /* 6 */
//     return (
//         <h1>Loading ...</h1>
//     )
// }
//
//
// // Login
// export const Login = () => {
//     /* 7 */
//
//     const users = useAppSelector(state => state.app.users)
//     const isLoading = useAppSelector(state => state.app.isLoading)
//
//     return (
//         <div>
//             {isLoading && <Loader/>}
//             {users.map((u) => <p key={u.id}>{u.email}</p>)}
//             <h1>В данном задании на экран смотреть не нужно. Рекомендуем взять ручку, листик и последовательно, спокойно
//                 расставить цифры в нужном порядке. Прежде чем давать ответ обязательно посчитайте к-во цифр и сверьте с
//                 подсказкой. Удачи 🚀
//             </h1>
//         </div>
//     );
// }
//
// // App
// export const App = () => {
//     /* 8 */
//     const dispatch = useAppDispatch()
//
//     useEffect(() => {
//         /* 9 */
//         dispatch(getUsersTC())
//     }, [])
//
//     /* 10 */
//     return (
//         <Routes>
//             <Route path={''} element={<Login/>}/>
//         </Routes>
//     )
// }
//
// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(<Provider store={store}><BrowserRouter><App/></BrowserRouter></Provider>)
//
// // 📜 Описание:
// // Задача: напишите в какой последовательности вызовутся числа при успешном запросе.
// // Подсказка: будет 13 чисел.
// // Ответ дайте через пробел.
//
// // 🖥 Пример ответа: 1 2 3 4 5 6 7 8 9 10 1 2 3
