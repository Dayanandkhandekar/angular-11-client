export class ErrorModel {
    private _errorCodes:string[]=[] 
    
    get errorCodes(): string[] {
        return this._errorCodes;
    }   
    
    set errorCodes(errorCodes: string[]) {       
        this._errorCodes = errorCodes;       
    }

    set errorCode(errorCode: string) {       
        this._errorCodes.push(errorCode);       
    }

    constructor(errorCodes:string[]){   
        this._errorCodes=errorCodes             
    } 
     
    getErrorCodeKey(index:number): string {        
        return "ERROR."+this._errorCodes[index]+"";
    }
    
    
        
}