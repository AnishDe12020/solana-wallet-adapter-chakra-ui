import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { Image, ListItem, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, List, Collapse, Icon } from '@chakra-ui/react';
import { WalletReadyState } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
import { ChevronsUpDownIcon, ChevronsDownUpIcon } from 'lucide-react';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';

var D=createContext({isOpen:!1,setOpen:()=>!1}),I=()=>useContext(D);var d=({wallet:t,...e})=>t&&jsx(Image,{src:t.adapter.icon,alt:`${t.adapter.name} icon`,...e,h:8,w:8});var P=({onClick:t,wallet:e,...a})=>jsx(ListItem,{...a,w:"full",h:"16",children:jsx(Button,{onClick:t,leftIcon:jsx(d,{wallet:e}),variant:"ghost",w:"full",justifyContent:"start",rounded:"none",py:2,h:"full",children:e.adapter.name})});var E=({title:t="Select Your Wallet",featuredWallets:e=3,...a})=>{let{wallets:i,select:o}=useWallet(),{isOpen:f,setOpen:p}=I(),[c,x]=useState(!1),[g,r]=useMemo(()=>{let l=[],s=[],k=[];i.forEach(m=>{m.readyState===WalletReadyState.NotDetected?k.push(m):m.readyState===WalletReadyState.Loadable?s.push(m):m.readyState===WalletReadyState.Installed&&l.push(m);});let B=[...l,...s,...k];return [B.slice(0,e),B.slice(e)]},[i,e]),C=useCallback((l,s)=>{o(s),p(!1);},[o,p]),M=useCallback(()=>x(!c),[x,c]);return jsxs(Modal,{isOpen:f,onClose:()=>p(!1),...a,children:[jsx(ModalOverlay,{}),jsxs(ModalContent,{children:[jsx(ModalHeader,{children:t}),jsx(ModalBody,{children:jsxs(List,{children:[g.map(l=>jsx(P,{onClick:s=>C(s,l.adapter.name),wallet:l},l.adapter.name)),r.length?jsxs(Fragment,{children:[jsx(Collapse,{in:c,unmountOnExit:!0,children:jsx(List,{children:r.map(l=>jsx(P,{onClick:s=>C(s,l.adapter.name),wallet:l},l.adapter.name))})}),jsx(ListItem,{children:jsxs(Button,{onClick:M,children:[c?"Less":"More"," options",c?jsx(Icon,{as:ChevronsUpDownIcon}):jsx(Icon,{as:ChevronsDownUpIcon})]})})]}):null]})})]})]})};var At=({children:t,disabled:e,...a})=>{let{publicKey:i,wallet:o,connected:f,connecting:p,connect:c,disconnect:x}=useWallet(),{setOpen:g}=I(),r=useMemo(()=>i?.toBase58(),[i]),C=useMemo(()=>t||(!o||!r?null:`${r.slice(0,4)}..${r.slice(-4)}`),[o,r,t]);if(!o)return jsx(Button,{onClick:()=>g(!0),...a,children:t||"Select Wallet"});let M=useMemo(()=>t||(p?"Connecting ...":f?"Connected":o?"Connect":"Connect Wallet"),[t,p,f,o]);return r?jsx(Fragment,{children:jsx(Button,{...a,leftIcon:jsx(d,{wallet:o}),children:C})}):jsx(Button,{disabled:e||!o||p||f,leftIcon:jsx(d,{wallet:o}),onClick:()=>c().catch(()=>{}),...a,children:M})};var Qt=({children:t,...e})=>{let[a,i]=useState(!1);return jsxs(D.Provider,{value:{isOpen:a,setOpen:i},children:[t,jsx(E,{...e})]})};

export { E as WalletDialog, D as WalletDialogContext, Qt as WalletDialogProvider, d as WalletIcon, P as WalletListItem, At as WalletMultiButton, I as useWalletDialog };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map