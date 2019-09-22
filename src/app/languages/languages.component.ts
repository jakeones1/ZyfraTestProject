import { Component, OnInit } from '@angular/core';
import { Node } from '../models/node.model';
import { TreeNode } from '../models/tree-node.model';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { LanguagesService } from '../languages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.less']
})
export class LanguagesComponent implements OnInit {
  constructor(
    private languageService: LanguagesService,
    private router: Router
  ) {

  }

  treeControl = new NestedTreeControl<TreeNode>((node: TreeNode) => node.children);
  treeDataSource = new MatTreeNestedDataSource<TreeNode>();

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

  ngOnInit(): void {
    this.languageService.getLanguages().subscribe(data => {
      this.treeDataSource.data = this.getTreeNodes(data);
    });
  }

  selectTreeNode(treeNode: TreeNode): void {
    if (!treeNode.children) {
      this.router.navigate(['languages/language/' + treeNode.sourceObject.id]);
      this.languageService.selectedLanguageId = treeNode.sourceObject.id;
    }
  }

  isSelectedNode(node: TreeNode): boolean {
    return this.languageService.selectedLanguageId ?
    this.languageService.selectedLanguageId === node.sourceObject.id : false;
  }

  getTreeNodes(nodes: Node[]): TreeNode[] {
    let treeNodes: TreeNode[] = [];

    // получаем чиcтый массив исходных нодов
    let sourceNodes: Node[] = JSON.parse(JSON.stringify(nodes));

    // функция, которая рекурсивно ищет дочерние ноды
    const findChildren = (parentId: number) => {
      let childTreedNodes: TreeNode[] = [];
      while (true) {
        // находим в исходном массиве объект, у которого parentId равен равен переданному parentId
        // то есть передаем свойство id вышестоящего объекта
        // до тех пор, пока не будут найдены все дочерние объекты
        let childNode: Node = sourceNodes.find((node: Node) => node.parentId === parentId);
        if (!childNode) {
          if (childTreedNodes.length > 0) {
            return childTreedNodes;
          } else {
            return null;
          }
        }

        // удаляем найденный объект из исходого массива
        sourceNodes.splice(sourceNodes.indexOf(childNode), 1);
        // создаем TreeNode, в конструктор передаем найденный childNode и пока пустой массив
        let newTreeNode: TreeNode = new TreeNode(childNode, []);
        // рекурсивно находим дочерние объекты у найденного объекта
        newTreeNode.children = findChildren(childNode.id);
        // пушим в результирующий массив
        childTreedNodes.push(newTreeNode);
      }
    };

    // перебираем исходные ноды. Если у ноды есть родитель, то пропускаем ее
    // если нет, то это корневой нод и у него можно рекурсивно получить дочерние ноды
    sourceNodes.forEach((sourceNode: Node) => {
      if (sourceNode.parentId) {
        return;
      }

      let treeNode: TreeNode = new TreeNode(sourceNode, []);
      treeNode.children = findChildren(sourceNode.id);
      treeNodes.push(treeNode);
    });
    return treeNodes;
  }
}
