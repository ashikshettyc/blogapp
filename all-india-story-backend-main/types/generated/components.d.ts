import type { Schema, Struct } from '@strapi/strapi';

export interface BlogContent extends Struct.ComponentSchema {
  collectionName: 'components_blog_contents';
  info: {
    description: '';
    displayName: 'Content';
    icon: 'apps';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    test: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'default';
        }
      >;
  };
}

export interface BlogImage extends Struct.ComponentSchema {
  collectionName: 'components_blog_images';
  info: {
    displayName: 'Image';
    icon: 'expand';
  };
  attributes: {
    Image: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
  };
}

export interface BlogTest extends Struct.ComponentSchema {
  collectionName: 'components_blog_tests';
  info: {
    description: '';
    displayName: 'test';
    icon: 'bulletList';
  };
  attributes: {
    Test: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'default';
        }
      >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blog.content': BlogContent;
      'blog.image': BlogImage;
      'blog.test': BlogTest;
    }
  }
}
