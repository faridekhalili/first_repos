import { useEffect, useRef, memo, useMemo, useState } from "react";
import Modal from "./Modal";

const Hooks = memo(({ logSm }) => {

    Hooks.displayName = 'HOOKS EEEE'

    const stateRef = useRef('')

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current = 'HELLO WORLD'
    }, [])

    const memoConst = useMemo(() => {
        console.log('RENDER')
        return 'memo world'
    }, [])
    
    return ( 
        <div>
            <Modal/>
            <input ref={stateRef} onChange={(e) => stateRef.current = e.target.value}/>
            <button onClick={() => console.log(inputRef)}>{memoConst}</button>
        </div>
    );
})
 
export default Hooks;