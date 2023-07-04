import { Component, Inject, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MOBILE_VALIDATION_PATTERN } from '../constants/utilis.constants';
import { ErrorModel } from '../models/_error.model';



@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
 // styleUrls: ['./client-add.component.scss']
})
export class ClientAddComponent {

  public vendorForm = new FormGroup({
    vndCode: new FormControl('', [Validators.required]),
    vndName: new FormControl('', [Validators.required]),      
    vndType: new FormControl('INTERNAL', [Validators.required]),
    userId:new FormControl('',[Validators.required]),
    vndEmail: new FormControl('', [Validators.required,Validators.email]),
    vndMobNo: new FormControl('', [Validators.pattern(MOBILE_VALIDATION_PATTERN)]),
    vndPhNo: new FormControl('', [Validators.pattern(MOBILE_VALIDATION_PATTERN)]), 
});
calibrators=[]
vendorTypes=[{
    id:"EXTERNAL",
    value:"EXTERNAL"
},{
    id:"INTERNAL",
    value:"INTERNAL"
}]
loading = false;
private unsubscribe: Subscription[] = [];
vendor;  

constructor(private activatedRoute: ActivatedRoute,
  
    
    private router: Router,
   ) { }

ngOnInit() {        
    this.getUnassignedCbr();
            
    const routeSubscription = this.activatedRoute.params.subscribe(params => {
        const vendorId = params.id;
        if (vendorId && vendorId > 0) {
            let getVendorPayload = {
                "id": vendorId
            }

            // const getVndByIdSubscr = this.vendorService.getVendorById(getVendorPayload).subscribe(vendor => {
            //     if (vendor) {
            //         this.vendor = vendor;
            //         this.createVendorForm();
            //     }
            // })
            // this.unsubscribe.push(getVndByIdSubscr);
        }
        else {
            this.vendor = {};
            this.initVendor();
        }
    });
    this.unsubscribe.push(routeSubscription);
}

/**
* Returns component title
*/
getComponentTitle() {
    let result = 'Create Vendor';
    if (!this.vendor || !this.vendor.id) {
        return result;
    }
    result = `Edit Vendor - ${this.vendor.vndName}`;
    return result;
}

initVendor() {
    //this.createVendorForm();

  
}

/**
 * Create Vendor Form
 */

createVendorForm() {
    this.vendorForm.setValue({
        vndCode: this.vendor.vndCode,
        vndName: this.vendor.vndName,
        vndEmail: this.vendor.vndEmail,
        vndMobNo: this.vendor.vndMobNo,
        vndPhNo: this.vendor.vndPhNo,
        vndType:this.vendor.vndType,
        userId:this.vendor.userId,
    });
    this.onVendorTypeChanged();  

}   
/**
 * Submit Vendor Form
 */

onSumbit() {              
    const controls = this.vendorForm.controls;	
      
/** check form */
if (this.vendorForm.invalid) {
        Object.keys(controls).forEach(controlName =>
    controls[controlName].markAsTouched()
  );	
  return;
}   
    const createVendorPayload = {
        "vndCode": controls["vndCode"].value,
        "vndName": controls["vndName"].value,
        "vndEmail": controls["vndEmail"].value,
        "vndMobNo": controls["vndMobNo"].value,
        "vndPhNo": controls["vndPhNo"].value,
        "vndType":controls["vndType"].value,
        "userId":controls["userId"].value,
    } 
    
    if (this.vendor.id > 0) {
        this.updateVendor(createVendorPayload);
        return;
    }
    else {
        //create new Vendor
        this.createVendor(createVendorPayload);
    }

}
/**
 * Create Vendor
 */
createVendor(payload) {
    this.loading = true;

    // const createVendorSubscr = this.vendorService.createVendor(payload).subscribe(createVndResponse => {
    //     this.loading = false;
    //     this.toastrService.success("New vendor has been added successfully.");
    //     //navigate to vendor-management page          
    //     this.router.navigate(['/vendor-management/vendors/all']);           

    // }, (error: ErrorModel) => {
    //     this.loading = false;
    //     error.errorCodes.forEach((err, index) => {
    //         this.toastrService.error(this.translate.instant(error.getErrorCodeKey(index)));
    //     });
    // });
    // this.unsubscribe.push(createVendorSubscr);
}

/**
 * Update Vendor
 */
updateVendor(payload) {
    payload.id = this.vendor.id;

    // this.loading = true;
    // const updateVendorSubscr = this.vendorService.editVendor(payload).subscribe(updateVndRes => {
    //     this.loading = false;
    //     this.toastrService.success("New vendor has been updated successfully."); 
    //     this.router.navigate(['/vendor-management/vendors/all']);       
    // }, (error: ErrorModel) => {
    //     this.loading = false;
    //     error.errorCodes.forEach((err, index) => {
    //         this.toastrService.error(this.translate.instant(error.getErrorCodeKey(index)));
    //     });
    // });
   // this.unsubscribe.push(updateVendorSubscr);                   
}

isControlHasError(controlName: string, validationType: string): boolean {
const control = this.vendorForm.controls[controlName];
if (!control) {
  return false;
}		
const result = control.hasError(validationType) && (control.dirty || control.touched);
return result;
}

/**
 * featch all calibs
 */
getUnassignedCbr(){
//     const allUsersSubscr = this.userService.getUnassignedCbrs().subscribe(calibrators => {
//   this.calibrators = calibrators;						
// })
//     this.unsubscribe.push(allUsersSubscr);
}

onVendorTypeChanged(){       
    if(this.vendorForm.get('vndType').value==this.vendorTypes[1].value){
        this.vendorForm.get('userId').setValidators([Validators.required]);
        this.vendorForm.get('userId').updateValueAndValidity();
    }else{
        this.vendorForm.get('userId').clearValidators();
        this.vendorForm.get('userId').setValue(null);               
    }
    this.vendorForm.get('userId').updateValueAndValidity();  
}

ngOnDestroy() {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
}


  

}