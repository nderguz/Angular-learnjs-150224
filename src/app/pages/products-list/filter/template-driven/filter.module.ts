import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FormsModule} from '@angular/forms';
import {FilterComponent} from './filter.component';
import {CounterInputModule} from '../../../../shared/counter-input/counter-input.module';
import {ValidatorsModule} from '../../../../shared/test-validators/directives/validators.module';

@NgModule({
    declarations: [FilterComponent],
    imports: [
        CommonModule,
        MatInputModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        CounterInputModule,
        FormsModule,
        ValidatorsModule,
    ],
    exports: [FilterComponent],
})
export class FilterModule {}
