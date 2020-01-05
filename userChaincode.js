'use strict';

const{Contract}=require('fabric-contract-api');

class UserContract extends contract{

constructor(){

super('org.reg-network.usernet');

}

async instantiate(ctx){
	console.log('Registraction-User Contract has been instantiated');
	}
	
	
	
	
async requestNewUser(ctx,userName,userEmail,userPhn,userAadhar){
	let caller=ctx.clientIdentity.getMSPID()
	if(caller=='usersMSP'){
	const requestKey=ctx.stub.createCompositeKey('org.reg-network.usernet.request',[userName,userAadhar]);
	let newRequestObject={
		userName: userName,
		userEmail: userEmail,
		userPhn: userPhn,
		userAadhar: userAadhar,
		createdAt: new Date(),
	};
	let userRequestBuffer =Buffer.from(JSON.stringify(newRequestObject));
	await ctx.stub.putState(requestKey,userRequestBuffer);
	return newRequestObject;}
	else{
		console.log("some non-user called this function")
	}
}




async rechargeAccount (ctx,userName,userAadhar,transactionId){
	let caller=ctx.clientIdentity.getMSPID()
	if(caller=='usersMSP')
	{
	const userKey=ctx.stub.createCompositeKey('org.reg-network.regnet.user',[userName,userAadhar]);
	let OwnerBuffer= await ctx.stub.getState(OwnerKey).catch(err=>console.log(err));
	let upg=0;
	const Owner= JSON.parse(OwnerBuffer.toString());
	if(transactionId=='upg100'){
		upg=100;

	}
	else if(transactionId=='upg500'){
		upg=500;

	}
	else if( transactionId=='upg1000'){
		upg=1000;
	}
	

	let newUserObject={
		
		
		
		userName: userName,
		userEmail: userEmail,
		userPhn: userPhn,
		userAadhar: userAadhar,
		createdAt: new Date(),
		updatedAt: new Date(),
		upgradCoins : upg,
		
	};	let dataBuffer =Buffer.from(JSON.stringify(newuserObject));
	await ctx.stub.putState(userKey,dataBuffer);
	return newUserObject;
}
else{
	console.log("some non-user called this function")
}
	

}




async viewProperty(ctx,propertyId){
	const propertyKey=ctx.stub.createCompositeKey('org.reg-network.regnet.property',[propertyId]);
	let propertyBuffer = await ctx.stub.getState(propertyKey).catch(err=>console.log(err));
	return JSON.parse(propertyBuffer.toString());
}

async viewUser(ctx,userName,userAadhar){
	const userKey=ctx.stub.createCompositeKey('org.reg-network.regnet.user',[userName,userAadhar]);
	let userBuffer = await ctx.stub.getState(userKey).catch(err=>console.log(err));
	return JSON.parse(userBuffer.toString());
}


async propertyRegistrationRequest(ctx,propertyId,propertyOwner,propertyPrice,propertyStatus,userName,userAadhar){
	let caller=ctx.clientIdentity.getMSPID()
	if(caller=='usersMSP'){
	const propertyRequestKey=ctx.stub.createCompositeKey('org.reg-network.usernet.propertyRequest',[propertyId]);
	const OwnerKey=ctx.stub.createCompositeKey('org.reg-network.regnet.user',[userName,userAadhar]);
	
	let OwnerBuffer= await ctx.stub.getState(OwnerKey).catch(err=>console.log(err));
	
	const Owner= JSON.parse(OwnerBuffer.toString());
	
	if(Owner== undefined){
		console.log("The user is not registered")
	}
	
	else{
	let newPropertyRequestObejct={
		propertyId: propertyId,
		propertyOwner: OwnerKey,
		propertyPrice: propertyPrice,
		propertyStatus: propertyStatus,
		
	}
	let propertyRequestBuffer=Buffer.from(JSON.stringify(newPropertyRequestObejct));
	await ctx.stub.putState(propertyRequestKey,propertyRequestBuffer);
	return newPropertyRequestObejct;
	}
}
else{
	console.log("some non-user called this function")
}
}


async purchaseProperty(ctx,propertyId,userName,userAadhar){
	let caller=ctx.clientIdentity.getMSPID()
	if(caller=='usersMSP'){
	const propertyKey=ctx.stub.createCompositeKey('org.reg-network.regnet.property',[propertyId]);
	const pruchaserKey=ctx.stub.createCompositeKey('org.reg-network.regnet.user',[userName,userAadhar]);
	

	let purchaserBuffer= await ctx.stub.getState(purchaserKey).catch(err=>console.log(err));
	
	const purchaser= JSON.parse(purchaserBuffer.toString());

	let propertyBuffer= await ctx.stub.getState(propertyKey).catch(err=>console.log(err));
	
	const property= JSON.parse(propertyBuffer.toString());
	const ownerKey=property.Owner;
	let ownerBuffer= await ctx.stub.getState(property.Owner).catch(err=>console.log(err));
	const owner = JSON.parse(ownerBuffer.toString());

	if(property.propertyStatus=='onSale'){
		if(purchaser.upgradCoins>property.propertyPrice){
			let status='registered';
			let newBalance1=purchaser.upgradCoins-property.propertyPrice;
			let newBalance2=owner.upgradCoins+property.propertyPrice;


			let newpropertyObject={
				propertyId: property.propertyId,
				propertyOwner: purchaserKey,
				propertyPrice: property.propertyPrice,
				propertyStatus: property.propertStatus,

			};

			let newpurchaserObject={
				userName: purchaser.userName,
				userEmail: purchaser.userEmail,
				userPhn: purchaser.userPhn,
				userAadhar: purchaser.userAadhar,
				createdAt: purchaser.createdAt,
				updatedAt:  new Date(),
				registerby: purchaser.registerby,
				upgradCoins : newBalance1,
			};

			let newownerObject={
				userName: owner.userName,
				userEmail: owner.userEmail,
				userPhn: owner.userPhn,
				userAadhar: owner.userAadhar,
				createdAt: owner.createdAt,
				updatedAt:  new Date(),
				registerby: owner.registerby,
				upgradCoins : newBalance2,
			};

			let newpropertyBuffer=Buffer.from(JSON.stringify(newpropertyObject));
			await ctx.stub.putState(propertyKey,newpropertyBuffer);

			let newpurchaserObjectBuffer=Buffer.from(JSON.stringify(newpurchaserObject));
			await ctx.stub.putState(pruchaserKey,newpurchaserObjectBuffer);

			let newownerObjectBuffer=Buffer.from(JSON.stringify(newownerObject));
			await ctx.stub.putState(ownerKey,newownerObjectBuffer);
			

			}
		
		}
	}
	else {
		console.log("some non-user called this function")
	
	}
}
async updateProperty(propertyId,userName,userAadhar,status){
	let caller=ctx.clientIdentity.getMSPID()
	if(caller=='usersMSP'){
		ownerKey=ctx.stub.createCompositeKey('org.reg-network.regnet.user',[userName,userAadhar]);
		propertyKey=ctx.stub.createCompositeKey('org.reg-network.regnet.property',[propertyId]);

		let propertyBuffer= await ctx.stub.getState(propertyKey).catch(err=>console.log(err));
	
		const property= JSON.parse(propertyBuffer.toString());
		if(property.propertyOwner==ownerKey){
			let newpropertyObject={
				propertyId: property.propertyId,
				propertyOwner: property.propertyOwner,
				propertyPrice: property.propertyPrice,
				propertyStatus: status,

			};
			let newpropertyBuffer=Buffer.from(JSON.stringify(newpropertyObject));
			await ctx.stub.putState(propertyKey,newpropertyBuffer);

		}
	}
	else {
		console.log("some non-user called this function")
	
	}

}


}



