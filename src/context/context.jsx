import React, { useState, useEffect } from 'react';
import mockUser from './mockData/mockUser';
import mockRepos from './mockData/mockRepos';
import mockFollowers from './mockData/mockFollowers';
import axios from 'axios';
import { createContext } from 'react';
import { useContext } from 'react';

const rootUrl = 'https://api.github.com';
const AppContext = createContext()
export const AppProvider = ({ children }) => {
    const [githubUser, setGithubUser] = useState(mockUser)
    const [repos, setRepos] = useState(mockRepos)
    const [followers, setFollower] = useState(mockFollowers)
    const [requests, setRequests] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({ show: false, msg: "" })

    const searchUser = async (user) => {
        setLoading(true)
        try {
            const foundUser = await axios.get(`${rootUrl}/users/${user}`)
            setGithubUser(foundUser.data);
            const resp1 = await axios.get(`${rootUrl}/users/${user}/repos?per_page=100`)
            setRepos(resp1.data)
            const resp2 = await axios.get(`${rootUrl}/users/${user}/followers?per_page=100`)
            setFollower(resp2.data)
            checkRequest()
            setLoading(false)
            toggleError(false, "")
        } catch (error) {
            setLoading(false)
            toggleError(true, "no such user")
        }
    }
    const checkRequest = async () => {
        try {
            const rateLimit = await axios.get(`${rootUrl}/rate_limit`);
            const { remaining, limit } = (rateLimit.data.rate);
            if (remaining === 0) {
                toggleError(true, "you have exceeded hourly limit")
            }
            setRequests(remaining)
        } catch (error) {
            setRequests(0)
        }
    }

    function toggleError(show = false, msg) {
        setError({ show, msg })
    }

    useEffect(() => {
        checkRequest()
    },
        [])

    return <>
        <AppContext.Provider value={{ searchUser, githubUser, repos, followers, requests, error, loading }}>
            {children}
        </AppContext.Provider>
    </>
}
export const useGlobalContext = () => useContext(AppContext)