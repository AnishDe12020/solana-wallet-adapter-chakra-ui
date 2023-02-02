'use strict';

var react = require('react');
var react$1 = require('@chakra-ui/react');
var walletAdapterBase = require('@solana/wallet-adapter-base');
var walletAdapterReact = require('@solana/wallet-adapter-react');
var lucideReact = require('lucide-react');
var jsxRuntime = require('react/jsx-runtime');

var D=react.createContext({isOpen:!1,setOpen:()=>!1}),I=()=>react.useContext(D);var d=({wallet:t,...e})=>t&&jsxRuntime.jsx(react$1.Image,{src:t.adapter.icon,alt:`${t.adapter.name} icon`,...e,h:8,w:8});var P=({onClick:t,wallet:e,...a})=>jsxRuntime.jsx(react$1.ListItem,{...a,w:"full",h:"16",children:jsxRuntime.jsx(react$1.Button,{onClick:t,leftIcon:jsxRuntime.jsx(d,{wallet:e}),variant:"ghost",w:"full",justifyContent:"start",rounded:"none",py:2,h:"full",children:e.adapter.name})});var E=({title:t="Select Your Wallet",featuredWallets:e=3,...a})=>{let{wallets:i,select:o}=walletAdapterReact.useWallet(),{isOpen:f,setOpen:p}=I(),[c,x]=react.useState(!1),[g,r]=react.useMemo(()=>{let l=[],s=[],k=[];i.forEach(m=>{m.readyState===walletAdapterBase.WalletReadyState.NotDetected?k.push(m):m.readyState===walletAdapterBase.WalletReadyState.Loadable?s.push(m):m.readyState===walletAdapterBase.WalletReadyState.Installed&&l.push(m);});let B=[...l,...s,...k];return [B.slice(0,e),B.slice(e)]},[i,e]),C=react.useCallback((l,s)=>{o(s),p(!1);},[o,p]),M=react.useCallback(()=>x(!c),[x,c]);return jsxRuntime.jsxs(react$1.Modal,{isOpen:f,onClose:()=>p(!1),...a,children:[jsxRuntime.jsx(react$1.ModalOverlay,{}),jsxRuntime.jsxs(react$1.ModalContent,{children:[jsxRuntime.jsx(react$1.ModalHeader,{children:t}),jsxRuntime.jsx(react$1.ModalBody,{children:jsxRuntime.jsxs(react$1.List,{children:[g.map(l=>jsxRuntime.jsx(P,{onClick:s=>C(s,l.adapter.name),wallet:l},l.adapter.name)),r.length?jsxRuntime.jsxs(jsxRuntime.Fragment,{children:[jsxRuntime.jsx(react$1.Collapse,{in:c,unmountOnExit:!0,children:jsxRuntime.jsx(react$1.List,{children:r.map(l=>jsxRuntime.jsx(P,{onClick:s=>C(s,l.adapter.name),wallet:l},l.adapter.name))})}),jsxRuntime.jsx(react$1.ListItem,{children:jsxRuntime.jsxs(react$1.Button,{onClick:M,children:[c?"Less":"More"," options",c?jsxRuntime.jsx(react$1.Icon,{as:lucideReact.ChevronsUpDownIcon}):jsxRuntime.jsx(react$1.Icon,{as:lucideReact.ChevronsDownUpIcon})]})})]}):null]})})]})]})};var At=({children:t,disabled:e,...a})=>{let{publicKey:i,wallet:o,connected:f,connecting:p,connect:c,disconnect:x}=walletAdapterReact.useWallet(),{setOpen:g}=I(),r=react.useMemo(()=>i?.toBase58(),[i]),C=react.useMemo(()=>t||(!o||!r?null:`${r.slice(0,4)}..${r.slice(-4)}`),[o,r,t]);if(!o)return jsxRuntime.jsx(react$1.Button,{onClick:()=>g(!0),...a,children:t||"Select Wallet"});let M=react.useMemo(()=>t||(p?"Connecting ...":f?"Connected":o?"Connect":"Connect Wallet"),[t,p,f,o]);return r?jsxRuntime.jsx(jsxRuntime.Fragment,{children:jsxRuntime.jsx(react$1.Button,{...a,leftIcon:jsxRuntime.jsx(d,{wallet:o}),children:C})}):jsxRuntime.jsx(react$1.Button,{disabled:e||!o||p||f,leftIcon:jsxRuntime.jsx(d,{wallet:o}),onClick:()=>c().catch(()=>{}),...a,children:M})};var Qt=({children:t,...e})=>{let[a,i]=react.useState(!1);return jsxRuntime.jsxs(D.Provider,{value:{isOpen:a,setOpen:i},children:[t,jsxRuntime.jsx(E,{...e})]})};

exports.WalletDialog = E;
exports.WalletDialogContext = D;
exports.WalletDialogProvider = Qt;
exports.WalletIcon = d;
exports.WalletListItem = P;
exports.WalletMultiButton = At;
exports.useWalletDialog = I;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.cjs.map