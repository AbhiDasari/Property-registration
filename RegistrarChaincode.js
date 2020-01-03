'use strict';

const{Contract}=require('fabric-contract-api');

class RegistrarContract extends contract{
constructor(){

super('org.reg-network.registrarnet');

}

async instantiate(ctx){
	console.log('Registraction-Registrat Contract has been instantiated');
	}
async approveNewUser(ctx,userName,userAadhar){
	const userKey=ctx,stub.createCompositeKey('org.reg-network.regnet.user',[userName,userAadhar]);
	let newUserObject={
		
		
		
		userName: userName,
		userEmail: userEmail,
		userPhn: userPhn,
		userAadhar: userAadhar,
		createdAt: new Date(),
		upgradCoins : 'upg0',
		
		
		let dataBuffer =Buffer.from(JSON.stringify(newuserObject));
		await ctx.stub.putState(userKey,dataBuffer);
		return newUserObject;
	};
}

async approvePropertyRegistration(ctx){
		const
}
async viewUser(ctx){
	const requestKey=ctx,stub.createCompositeKey('org.reg-network.usernet.request',[userName,userAadhar]);
	let userBuffer = await ctx.stub.getState(requestKey).catch(err=>console.log(err));
	return JSON.parse(userBuffer.toString());
}

async viewProperty(ctx,propertyId){
	const propertyKey=ctx,stub.createCompositeKey('org.reg-network.usernet.request',[propertyId]);
	let propertyBuffer = await ctx.stub.getState(propertyKey).catch(err=>console.log(err));
	return JSON.parse(userBuffer.toString());
}
}
	