/*******************************************************************************
 * Copyright (c) 2014 IBM Corp.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * and Eclipse Distribution License v1.0 which accompany this distribution.
 *
 * The Eclipse Public License is available at
 *   http://www.eclipse.org/legal/epl-v10.html
 * and the Eclipse Distribution License is available at
 *   http://www.eclipse.org/org/documents/edl-v10.php.
 *
 * Contributors:
 *   Bryan Boyd - Initial implementation 
 *******************************************************************************/

var config = {
	iot_deviceType: "truck",     // replace with your deviceType
	iot_deviceOrg: "zkefj8",       // replace with your IoT Foundation organization
	iot_deviceSet: [               // replace with your registered device(s)
		{ deviceId: "truck4", token: "kpF4!2EI6r1DSNF*Uu" },   
		{ deviceId: "truck1", token: "Twa46kFW8AbCF3!rMH" },
		{ deviceId: "truck2", token: "IIz8X1bdZ-mM3lx+)c" },
		{ deviceId: "truck3", token: "Kl)Mw*NSDTpbnU51Ns" },
		{ deviceId: "truck5", token: "PL&Vtc!@ai(Qq+jXdO" },
		{ deviceId: "truck6", token: "Ymxq*6SkcfQc9Ksi9u" },
		{ deviceId: "truck7", token: "&0Gg2@E5_@k&BAr1s2" },
		{ deviceId: "truck8", token: "I43KmnY2MSCOBRaK@j" },
		{ deviceId: "truck9", token: "faL*GVjF6ey*4iR40y" },
		{ deviceId: "truck10", token: "HxPYgIkWWPjQscCaYZ"}
	],
	iot_apiKey: "a-zkefj8-7dhxdv7m8l",    // replace with the key for a generated API token
	iot_apiToken: "yfjFEa_tHnuFK5oSZk",  // replace with the generated API token

	// these topics will be used by Geospatial Analytics
	notifyTopic: "iot-2/type/api/id/geospatial/cmd/geoAlert/fmt/json",
	inputTopic: "iot-2/type/vehicle/id/+/evt/telemetry/fmt/json",
};

try {
	module.exports = config;
} catch (e) { window.config = config; }
