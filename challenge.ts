async function sleep(ms: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), ms)
    })
}

async function randomDelay() {
    const randomTime = Math.round(Math.random() * 1000)
    return sleep(randomTime)
}

export class ShipmentSearchIndex {
    async updateShipment(id: string, shipmentData: any) {
        const startTime = new Date()
        await randomDelay()
        const endTime = new Date()
        console.log(`update ${id}@${
            startTime.toISOString()
            } finished@${
            endTime.toISOString()
            }`
        )

        return { startTime, endTime }
    }
}

// Implementation needed
interface ShipmentUpdateListenerInterface {
    receiveUpdate(id: string, shipmentData: any)
}

  export class ShipmentUpdate implements ShipmentUpdateListenerInterface {
    private updateQueue: string[];
  
    constructor(private shipmentSearchIndex: ShipmentSearchIndex) {
      this.updateQueue = [];
    }
  
    async receiveUpdate(id: string, shipmentData: any) {
      if (this.updateQueue.includes(id)) {
        console.log('this update is already in queue');
        return;
      }
      this.updateQueue.push(id);
      try {
        const processTime = await this.shipmentSearchIndex.updateShipment(id, shipmentData);
        console.log('Shipment Updated \n', { id, ...shipmentData, ...processTime });
      } catch(e) {
        console.log('Shipment update failed', e.stack);
      }
      this.updateQueue = this.updateQueue.filter(idx => idx !== id);
      console.log(this.updateQueue);
    }
  }