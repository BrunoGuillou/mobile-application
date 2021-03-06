import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { ObservationsService } from "../../observations.service";


interface Props {
    intensity?: number,
    origin?: number[]
}


@Component({ selector: 'app-odours', templateUrl: './odours.component.html', styleUrls: ['./odours.component.scss'] })
export class OdoursComponent implements OnInit {


    public _props: Props = {};


    constructor(private modalCtr: ModalController, private obsService: ObservationsService) { }


    ngOnInit(): void {

        this._props.intensity = this.obsService.newObservation.details.odours.intensity.code;
        this._props.origin     = [];
        this.obsService.newObservation.details.odours.origin.forEach(t => this._props.origin.push(t.code))

    }


    /**
     * Fired when a change event is fired by the origin checkbox group.
     *
     * @param {CustomEvent} e - The change event.
     */
    onTypeChange(e): void {

        if (e.detail.checked)
            this._props.origin.push(parseInt(e.detail.value));
        else
            this._props.origin = this._props.origin.filter(t => t !== parseInt(e.detail.value));

    }


    /**
     * Closes the modal and handle the data saving process.
     *
     * @param {Boolean} save - True if the modifications done in the modal are to be saved.
     */
    async closeModal(save: boolean): Promise<void> {

        if (save) {

            this.obsService.newObservation.details.odours.checked = true;
            this.obsService.newObservation.details.odours.intensity.code = this._props.intensity;
            this.obsService.newObservation.details.odours.origin = [];
            this._props.origin.forEach(t => this.obsService.newObservation.details.odours.origin.push({code: t}));

        }

        await this.modalCtr.dismiss();

    }

}
