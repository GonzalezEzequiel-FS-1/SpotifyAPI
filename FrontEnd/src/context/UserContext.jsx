import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
const UserContext = createContext();



export default function UserProvider({children}) {
    const [ user, setUser ] = useState(null);
  return (
    <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
  )
}
UserProvider.propTypes={
    children:PropTypes.node.isRequired
}
export const useUser = ()=>useContext(UserContext)