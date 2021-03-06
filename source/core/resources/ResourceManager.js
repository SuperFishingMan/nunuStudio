"use strict";

/**
 * Resource manager is used to manage available resources used by objects
 * 
 * The resource manager is used to extend the Program object and is not designed to be used as a standalone
 * 
 * The manager is used to manage the following types of resources:
 *  - Images
 *  - Videos
 *  - Audio
 *  - Fonts
 *  - Textures
 *  - Materials
 *  - Geometries
 *
 * @class ResourceManager
 * @constructor
 * @module Resources
 */

/**
 * Images.
 * 
 * @property images
 * @type {Array}
 */
/**
 * Videos.
 * 
 * @property videos
 * @type {Array}
 */
/**
 * Audio.
 * 
 * @property audio
 * @type {Array}
 */
/**
 * Fonts.
 * 
 * @property fonts
 * @type {Array}
 */
/**
 * Materials.
 * 
 * @property materials
 * @type {Array}
 */
/**
 * Textures.
 * 
 * @property textures
 * @type {Array}
 */
/**
 * Geometries.
 * 
 * @property geometries
 * @type {Array}
 */
function ResourceManager()
{
	this.images = [];
	this.videos = [];
	this.audio = [];
	this.fonts = [];

	this.materials = [];
	this.textures = [];
	this.geometries = [];
}

/**
 * Get material by its name.
 * 
 * @method getMaterialByName
 * @param {String} name Material name
 * @return {Material} Material if found else null
 */
ResourceManager.prototype.getMaterialByName = function(name)
{
	for(var i in this.materials)
	{
		if(this.materials[i].name === name)
		{
			return this.materials[i];
		}
	}

	return null;
};

/**
 * Add material to materials list.
 * 
 * @method addMaterial
 * @param {Material} material Material to be added
 */
ResourceManager.prototype.addMaterial = function(material)
{
	if(material instanceof THREE.Material)
	{
 		this.materials[material.uuid] = material;
 	}
};

/**
 * Remove material from materials list, also receives default material used to replace.
 * 
 * @method removeMaterial
 * @param {Material} material Material to be removed from manager.
 * @param {Material} defaultMaterial Default mesh material to replace objects mesh materials.
 * @param {Material} defaultMaterialSprite Defaul sprite material.
 */
ResourceManager.prototype.removeMaterial = function(material, defaultMaterial, defaultMaterialSprite)
{
	if(defaultMaterial === undefined)
	{
		defaultMaterial = new THREE.MeshBasicMaterial();
	}

	if(defaultMaterialSprite === undefined)
	{
		defaultMaterialSprite = new THREE.SpriteMaterial();
	}

	if(material instanceof THREE.Material)
	{
		delete this.materials[material.uuid];
		
		this.traverse(function(child)
		{
			if(child.material !== undefined && child.material.uuid === material.uuid)
			{
				if(child instanceof THREE.Sprite)
				{
					child.material = defaultMaterialSprite;
				}
				else
				{
					child.material = defaultMaterial;
				}
			}
		});
	}
};

/**
 * Get texture by name.
 * 
 * @method getTextureByName
 * @param {String} name Texture name.
 * @return {Texture} Texture is found else null.
 */
ResourceManager.prototype.getTextureByName = function(name)
{
	for(var i in this.textures)
	{
		if(this.textures[i].name === name)
		{
			return this.textures[i];
		}
	}

	return null;
};

/**
 * Add texture to texture list.
 * 
 * @method addTexture
 * @param {Texture} texture
 */
ResourceManager.prototype.addTexture = function(texture)
{
 	this.textures[texture.uuid] = texture;
};

/**
 * Remove texture from textures list (also receives default used to replace).
 * 
 * @method removeTexture
 * @param {Texture} texture
 * @param {Texture} defaultTexture
 * @return {Texture} Texture if found, else null
 */
ResourceManager.prototype.removeTexture = function(texture, defaultTexture)
{
	if(defaultTexture === undefined)
	{
		defaultTexture = new THREE.Texture();
	}

	if(texture instanceof THREE.Texture)
	{
		delete this.textures[texture.uuid];
		
		this.traverse(function(child)
		{
			if(child.material !== undefined)
			{
				var material = child.material;
				
				if(material.map != null && material.map.uuid === texture.uuid)
				{
					material.map = defaultTexture;
					material.needsUpdate = true;
				}
				else if(material.bumpMap != null && material.bumpMap.uuid === texture.uuid)
				{
					material.bumpMap = defaultTexture;
					material.needsUpdate = true;
				}
				else if(material.normalMap != null && material.normalMap.uuid === texture.uuid)
				{
					material.normalMap = defaultTexture;
					material.needsUpdate = true;
				}
				else if(material.displacementMap != null && material.displacementMap.uuid === texture.uuid)
				{
					material.displacementMap = defaultTexture;
					material.needsUpdate = true;
				}
				else if(material.specularMap != null && material.specularMap.uuid === texture.uuid)
				{
					material.specularMap = defaultTexture;
					material.needsUpdate = true;
				}
				else if(material.emissiveMap != null && material.emissiveMap.uuid === texture.uuid)
				{
					material.emissiveMap = defaultTexture;
					material.needsUpdate = true;
				}
				else if(material.alphaMap != null && material.alphaMap.uuid === texture.uuid)
				{
					material.alphaMap = defaultTexture;
					material.needsUpdate = true;
				}
				else if(material.roughnessMap != null && material.roughnessMap.uuid === texture.uuid)
				{
					material.roughnessMap = defaultTexture;
					material.needsUpdate = true;
				}
				else if(material.metalnessMap != null && material.metalnessMap.uuid === texture.uuid)
				{
					material.metalnessMap = defaultTexture;
					material.needsUpdate = true;
				}
			}
			else if(child instanceof ParticleEmitter)
			{
				if(child.group.texture.uuid === texture.uuid)
				{
					child.group.texture = defaultTexture;
				}
			}
		});
	}
};

/**
 * Get font by name.
 * 
 * @method getFontByName
 * @param {String} name
 * @return {Font} Font if found, else null
 */
ResourceManager.prototype.getFontByName = function(name)
{
	for(var i in this.fonts)
	{
		if(this.fonts[i].name === name)
		{
			return this.fonts[i];
		}
	}

	return null;
};

/**
 * Add font to fonts list.
 * 
 * @method addFont
 * @param {Font} font
 */
ResourceManager.prototype.addFont = function(font)
{
	if(font instanceof Font)
	{
 		this.fonts[font.uuid] = font;
 	}
}

/**
 * Remove font from font list.
 * 
 * @method removeFont
 * @param {Font} font
 * @param {Font} defaultFont
 */
ResourceManager.prototype.removeFont = function(font, defaultFont)
{
	if(defaultFont === undefined)
	{
		defaultFont = new Font();
	}

	if(font instanceof Font)
	{
		delete this.fonts[font.uuid];
		
		this.traverse(function(child)
		{
			if(child.font !== undefined && child.font.uuid === font.uuid)
			{
				child.setFont(defaultFont);
			}
		});
	}
};

/**
 * Get audio by name.
 * 
 * @method getAudioByName
 * @param {String} name
 * @return {Audio} Audio if found, else null
 */
ResourceManager.prototype.getAudioByName = function(name)
{
	for(var i in this.audio)
	{
		if(this.audio[i].name === name)
		{
			return this.audio[i];
		}
	}

	return null;
};

/**
 * Add audio to audio list.
 * 
 * @param {Audio} audio
 * @method addAudio
 */
ResourceManager.prototype.addAudio = function(audio)
{
	if(audio instanceof Audio)
	{
 		this.audio[audio.uuid] = audio;
 	}
};

/**
 * Remove audio.
 * 
 * @param {Audio} audio
 * @param {Audio} defaultAudio
 * @method removeAudio
 */
ResourceManager.prototype.removeAudio = function(audio, defaultAudio)
{
	if(defaultAudio === undefined)
	{
		defaultAudio = new Audio();
	}

	if(audio instanceof Audio)
	{
		delete this.audio[audio.uuid];
		
		this.traverse(function(child)
		{
			if(child.audio !== undefined && child.audio.uuid === audio.uuid)
			{
				child.setFont(defaultAudio);
			}
		});
	}
};
