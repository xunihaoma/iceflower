// 基本类型
// ---------------------------------------------------------------
// number boolean void undefined string symbol null
// ---------------------------------------------------------------

interface IceflowerAlert {
    text?: string;
    confirmBtnText?: string;
    cancelBtnText?: string;
    cancelBtnColor?: string;
    callback?(): void;
    width?: string;
    color?: string;
    zIndex?: number;
    type?: string;
    colorType?:  'danger' | 'success' | 'warning';
    cancel?: boolean;
    cancelCallback?(): void;
    close?: boolean;
    still?: boolean;

}





interface Iceflower {
    alert(object: IceflowerAlert): void;
    toast(): void;
    wxShare(): void;
    checkMobile(): void;
    urlQuery(name: string): void;
    loading(): void;
    closeLoading(): void;
    getWechatAuthUrl(): void;
    wxShare(): void;
    miniOpen(): void;
    appOpen(): void;
}




declare var iceflower: Iceflower;
