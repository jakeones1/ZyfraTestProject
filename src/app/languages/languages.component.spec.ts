import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguagesComponent } from './languages.component';
import { Node } from '../models/node.model';
import { TreeNode } from '../models/tree-node.model';
import { MatTreeModule, MatIconModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { LanguagesService } from '../languages.service';
import { HttpClientModule } from '@angular/common/http';

describe('LanguagesComponent', () => {
  let languagesComponent: LanguagesComponent;
  let fixture: ComponentFixture<LanguagesComponent>;

  beforeEach(async(() => {
    const appRoutes: Routes = [
      {path: '', redirectTo: 'languages', pathMatch: 'full'},
      {path: 'languages', component: LanguagesComponent, children:
        [
          { path: 'language/:id', component: LanguagesComponent}
        ]
      }
    ];
    TestBed.configureTestingModule({
      declarations: [ LanguagesComponent ],
      imports: [
        MatTreeModule,
        MatIconModule,
        RouterModule.forRoot(appRoutes),
        HttpClientModule
      ],
      providers: [
        LanguagesService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesComponent);
    languagesComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(languagesComponent).toBeTruthy();
  });

  it('should define treeControl property', () => {
    expect(languagesComponent.treeControl).toBeDefined();
  });

  it('should define treeDataSource property', () => {
    expect(languagesComponent.treeDataSource).toBeDefined();
  });

  it('should define hasChild property', () => {
    expect(languagesComponent.hasChild).toBeDefined();
  });

  it('should define isSelectedNode method', () => {
    expect(languagesComponent.isSelectedNode).toBeDefined();
  });

  it('should define ngOnInit method', () => {
    expect(languagesComponent.ngOnInit).toBeDefined();
  });

  it('should define getTreeNodes method', () => {
    expect(languagesComponent.getTreeNodes).toBeDefined();
  });

  it('should return TreeNode[]', () => {
    let nodes: Node[] = [
      {id: 1, name: 'name 1', parentId: null},
      {id: 2, name: 'child of name 1', parentId: 1},
      {id: 3, name: 'name 2', parentId: null},
      {id: 4, name: 'child of name 2', parentId: 3},
      {id: 5, name: 'child of child of name 2', parentId: 4},
    ];

    let expectedTreeNodes: TreeNode[] =[
      {
        sourceObject:
        {
          id: 1, name: "name 1",
          parentId: null
        },
        children: [
          {
            sourceObject: {
              id: 2,
              name: "child of name 1",
              parentId: 1
            },
            children:null
          }
        ]
      },
      {
        sourceObject: {
          id: 3,
          name: "name 2",
          parentId: null
        },
        children: [
          {
            sourceObject:{
              id: 4,
              name: "child of name 2",
              parentId: 3
            },
            children: [
              {
                sourceObject: {
                  id: 5,
                  name: "child of child of name 2",
                  parentId: 4
                }, children: null
              }
            ]
          }
      ]
    }
  ];


  let resultTreeNodes = languagesComponent.getTreeNodes(nodes);
  expect(JSON.stringify(resultTreeNodes)).toEqual(JSON.stringify(expectedTreeNodes));
  });
});
