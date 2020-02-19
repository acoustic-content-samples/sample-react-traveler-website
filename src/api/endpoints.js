/*
 * Copyright 2020 Acoustic, L.P.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

// Tenant configuration
export const DOMAIN_NAME = 'https://your-domain-name.com';
export const CONTENT_HUB_ID = '00000000-0000-0000-0000-00000000000';

// API endpoints
const DELIVERY_URL = 'delivery/v1';
export const BASE_URL = `${DOMAIN_NAME}/api/${CONTENT_HUB_ID}`;
export const BASE_DELIVERY_URL = `${BASE_URL}/${DELIVERY_URL}`;
export const BASE_RENDER_URL = `${BASE_DELIVERY_URL}/content`;
